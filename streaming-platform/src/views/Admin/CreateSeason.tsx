import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import { useCreateSeasonMutation, GetSeasonByShowDocument, Season, Episode } from 'generated/graphql';
import InputFileUpload from 'components/Primary-components/FileUploader';
import axios from 'axios';
import { Add, Delete } from '@mui/icons-material';

interface P{
    showId: number
}

interface FileUploader {
  path: string;
  file: File;
  preview: string;
}

const CreateSeason = (props : P) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [seasonData, setSeasonData] = useState<Season>({
    name: '',
    season_number: 1,
    is_set: false,
    showId: props.showId,
    poster_path: '',
    episodes: [],
  });
  const [poster, setPoster] = useState<FileUploader>({ path: '', file: new File([''], 'filename'), preview: '' });
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episode, setEpisode] = useState<Episode>({
    name: '',
    description: '',
    number: 1,
    path: '',
    image: '',
  });
  const [episodePoster, setEpisodePoster] = useState<FileUploader>({ path: '', file: new File([''], 'filename'), preview: '' });
  const [episodeVideo, setEpisodeVideo] = useState<FileUploader>({ path: '', file: new File([''], 'filename'), preview: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createSeasonMutation, { data, loading, error }] = useCreateSeasonMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSeasonData({
      ...seasonData,
      [name]: value,
    });
  };

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEpisode({
      ...episode,
      [name]: value,
    });
  };

  const handleAddEpisode = () => {
    setEpisodes([...episodes, { ...episode, image: episodePoster.preview, path: episodeVideo.preview }]);
    setEpisode({
      name: '',
      description: '',
      number: episode.number + 1,
      path: '',
      image: '',
    });
    setEpisodePoster({ path: '', file: new File([''], 'filename'), preview: '' });
    setEpisodeVideo({ path: '', file: new File([''], 'filename'), preview: '' });
  };

  const handleRemoveEpisode = (index: number) => {
    const updatedEpisodes = episodes.filter((_, i) => i !== index);
    setEpisodes(updatedEpisodes);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const posterFormData = new FormData();
      posterFormData.append('image', poster.file);

      const posterResponse = await axios.post(process.env.REACT_APP_ASSETS_URL + `/upload/posters`, posterFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedEpisodes = await Promise.all(
        episodes.map(async (ep) => {
          const posterFormData = new FormData();
          posterFormData.append('image', ep.image);
            console.log(ep.image)
          const videoFormData = new FormData();
          videoFormData.append('video', ep.path);
  
          const [posterResponse, videoResponse] = await Promise.all([
            axios.post(process.env.REACT_APP_ASSETS_URL + `/upload/posters`, posterFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
            axios.post(process.env.REACT_APP_ASSETS_URL + `/upload/episodeVideos`, videoFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          ]);
  
          return {
            ...ep,
            image: posterResponse.data.fileName,
            path: videoResponse.data.fileName,
          };
        })
      );
      
      const posterFileName = posterResponse.data.fileName;
      console.log(seasonData)
      const seasonInput = {
        ...seasonData,
        showId: props.showId,
        season_number: Number(seasonData.season_number),
        poster_path: posterFileName,
        episodes: updatedEpisodes.map((ep) => ({
          name: ep.name,
          description: ep.description,
          number: ep.number,
          path: ep.path,
          image: ep.image,
        })),
      };
      console.log(seasonInput)
      await createSeasonMutation({
        variables: {
          input: seasonInput,
        },
        refetchQueries: [{ query: GetSeasonByShowDocument, variables: { id: seasonInput.showId },  }],
      });



      handleClose();
    } catch (error) {
      console.error('Error creating season:', error);
    }
  };

  const handlePosterUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setPoster({ path: 'posters', file, preview });
  };

  const handleEpisodePosterUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setEpisodePoster({ path: 'episode_posters', file, preview });
  };

  const handleEpisodeVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setEpisodeVideo({ path: 'episode_videos', file, preview });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const steps = ['Create Season', 'Add Episodes'];

  return (
    <div className='AddBtn'>
      <IconButton onClick={handleOpen} aria-label="add season" size="large" style={{ color: 'white' }}>
        <Add fontSize="inherit" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Season</DialogTitle>
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
                    label="Season Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={seasonData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Season Number"
                    name="season_number"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                    value={seasonData.season_number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFileUpload name="Upload Poster" handleChange={handlePosterUpload} />
                  {poster.preview && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Poster Preview:</Typography>
                      <img src={poster.preview} alt="Poster Preview" style={{ width: '100%', maxHeight: '200px' }} />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </form>
          )}

          {activeStep === 1 && (
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Episode Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={episode.name}
                    onChange={handleEpisodeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Episode Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    value={episode.description}
                    onChange={handleEpisodeChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFileUpload name="Upload Episode Poster" handleChange={handleEpisodePosterUpload} />
                  {episodePoster.preview && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Episode Poster Preview:</Typography>
                      <img src={episodePoster.preview} alt="Episode Poster Preview" style={{ width: '100%', maxHeight: '200px' }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputFileUpload name="Upload Episode Video" handleChange={handleEpisodeVideoUpload} />
                  {episodeVideo.preview && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Video Preview:</Typography>
                      <video width="100%" controls>
                        <source src={episodeVideo.preview} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleAddEpisode}>
                    Add Episode
                  </Button>
                </Grid>
                {episodes.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Episodes:</Typography>
                    <Box style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      <ul>
                        {episodes.map((ep, index) => (
                          <li key={index}>
                            {ep.number}. {ep.name}{' '}
                            <IconButton onClick={() => handleRemoveEpisode(index)} aria-label="delete episode">
                              <Delete />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Grid>
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

export default CreateSeason;
