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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { ShowModel } from 'models/Models.types';
import { useCreateShowMutation, GetShowsDocument, useGetGenresQuery } from 'generated/graphql';
import InputFileUpload from 'components/Primary-components/FileUploader';
import axios from 'axios';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface FileUploader {
  path: string,
  file: File,
  preview: string
}

const CreateShow = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  //@ts-expect-error a
  const [seriesData, setSeriesData] = useState<ShowModel>({
    name: '',
    description: '',
    genres: [],
  });
  const [banner, setBanner] = useState<FileUploader>({ path: '', file: new File([""], "filename"), preview: '' });
  const [poster, setPoster] = useState<FileUploader>({ path: '', file: new File([""], "filename"), preview: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createShowMutation, { data, loading, error }] = useCreateShowMutation();

  const { loading: genresLoading, error: genresError, data: genresData } = useGetGenresQuery();
  const genres = genresData?.genres ?? [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>) => {
    const { name, value } = event.target;
    setSeriesData({
      ...seriesData,
      [name as string]: value,
    });
  };

  const handleGenresChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSeriesData({
      ...seriesData,
      genres: event.target.value as string[],
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const bannerFormData = new FormData();
      bannerFormData.append('file', banner.file);

      const posterFormData = new FormData();
      posterFormData.append('file', poster.file);

      const bannerResponse = await axios.post(process.env.REACT_APP_ASSETS_URL + `/upload/banners`, bannerFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const posterResponse = await axios.post(process.env.REACT_APP_ASSETS_URL + `/upload/posters`, posterFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const bannerFileName = bannerResponse.data.fileName;
      const posterFileName = posterResponse.data.fileName;

      const genresInput = seriesData.genres.map((genreId) => ({ id: genreId }));

      createShowMutation({
        variables: {
          input: {
            name: seriesData.name,
            description: seriesData.description,
            image: posterFileName,
            banner: bannerFileName,
            genres: genresInput,
          },
        },
        refetchQueries: [{ query: GetShowsDocument }],
      });

      handleClose();
    } catch (error) {
      console.error('Error creating show:', error);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setBanner({ path: 'banners', file, preview });
  };

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setPoster({ path: 'posters', file, preview });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const steps = ['Create Show', 'Additional Info'];

  const genreNameMap = new Map(genres.map((genre) => [genre?.id, genre?.name]));

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="add" size="large" style={{ color: 'white' }}>
        <Add fontSize="inherit" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Show</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} style={{ marginBottom: '20px' }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <form>
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
                      multiple
                      value={seriesData.genres}
                        //@ts-expect-error a
                      onChange={handleGenresChange}
                      renderValue={(selected) => (selected as string[]).map((id) => genreNameMap.get(id)).join(', ')}
                      label="Genres"
                    >
                      {genresLoading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                      ) : genresError ? (
                        <MenuItem disabled>Error loading genres</MenuItem>
                      ) : (
                        genres.map((genre: any) => (
                          <MenuItem key={genre.id} value={genre.id}>
                            {genre.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          )}

          {activeStep === 1 && (
            <form>
              <Grid item xs={12} sm={6}>
                <InputFileUpload name="Upload Banner" handleChange={handleBannerUpload} />
                {banner.preview && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Banner Preview:</Typography>
                    <img src={banner.preview} alt="Banner Preview" style={{ width: 'auto', maxHeight: '230px' }} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputFileUpload name="Upload Poster" handleChange={handlePosterUpload} />
                {poster.preview && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Poster Preview:</Typography>
                    <img src={poster.preview} alt="Poster Preview" style={{ width: 'auto', maxHeight: '340px' }} />
                  </Box>
                )}
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          {activeStep !== 0 && (
            <Button onClick={handleBack} color="secondary">
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Finish
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateShow;
