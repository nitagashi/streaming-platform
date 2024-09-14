import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ShowModel } from 'models/Models.types';
import { useCreateShowMutation, GetShowsDocument } from 'generated/graphql';
import InputFileUpload from 'components/Primary-components/FileUploader';

interface FileUploader {
  path: string,
  file: File
}

const CreateShow = () => {
  const [open, setOpen] = useState(false);
  const [seriesData, setSeriesData] = useState(new ShowModel());
  const [banner, setBanner] = useState<FileUploader>({ path: '', file: new File([""], "filename")});
  const [poster, setPoster] = useState<FileUploader>({ path: '', file: new File([""], "filename")});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createShowMutation, { data, loading, error }] = useCreateShowMutation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>) => {
    const { name, value } = event.target;
    setSeriesData({
      ...seriesData,
      [name as string]: value,
    });
  };

  const handleSubmit = (): void => {
    console.log(seriesData)
    try {
      createShowMutation({
        variables: {
          input: {
            name: seriesData.name,
            description: seriesData.description,
            image: '',
            banner: ''
          },
        },
        refetchQueries: [{ query: GetShowsDocument }],
      });

      handleClose();
    } catch (error) {
      console.error('Error creating show:', error);
    }

  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    if (!event.target.files) return
    console.log(event, "1")
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    setBanner({ path: 'banners', file: event.target.files[0] })
    // Make the fetch call
    // fetch(`https://localhost:8080/upload/${path}`, {
    //   method: 'POST',
    //   body: formData,
    //   // Uncomment the following line if you need to include credentials (e.g., for authentication)
    //   // credentials: 'include',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });

  }

  const handlePosterUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    setPoster({ path: 'posters', file: event.target.files[0] })
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        +
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Show</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Series Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  value={seriesData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={seriesData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genres-label">Genres</InputLabel>
                  <Select
                    labelId="genres-label"
                    name="genres"
                    value={seriesData.genres}
                    //@ts-expect-error a
                    onChange={handleChange}
                    label="Genres"
                  >
                    <MenuItem value="1">Drama</MenuItem>
                    <MenuItem value="2">Comedy</MenuItem>
                    <MenuItem value="3">Action</MenuItem>
                    <MenuItem value="4">Romance</MenuItem>
                    {/* Add more genres as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload name="Upload Banner" handleChange={handleBannerUpload} />
                <TextField
                  label="Banner URL"
                  name="banner"
                  variant="outlined"
                  fullWidth
                  value={seriesData.banner}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload name="Upload Poster" handleChange={handlePosterUpload} />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Add Series
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateShow;
