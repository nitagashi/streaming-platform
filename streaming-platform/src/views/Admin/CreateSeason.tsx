import React, { useState } from "react";
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
  styled,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import {
  useCreateSeasonMutation,
  GetSeasonByShowDocument,
} from "generated/graphql";
import InputFileUpload from "components/Primary-components/FileUploader";
import axios from "axios";
import { Add, Delete } from "@mui/icons-material";

interface P {
  showId: number;
}

interface FileUploader {
  path: string;
  file?: File;
  preview: string;
}

interface Season {
  episodes: Array<Episode>;
  is_set: boolean;
  name: string;
  poster_path: string;
  season_number: number;
  showId: number;
}

interface Episode {
  description: string;
  name: string;
  number: number;
  image?: File;
  path?: File;
}

const CustomDialog = styled(Dialog)(({ theme }: any) => ({
  "& .MuiStepLabel-label": {
    "&.Mui-active": {
      color: "#f5f5f7",
      background: "linear-gradient(135deg, #650000ba, #8b0000a1, #1e1e2b91, #11111491)",
      Opacity: "0.8",
      padding: "5px",
      borderRadius: "12px",
    },
    color: "#f5f5f7",
  },
  "& .MuiInputBase-root": {
    color: "#f5f5f7",
  },

  "& .MuiDialogTitle-root": {
    color: "#f5f5f7",
    backgroundColor: "#16161e",
  },
}));

const CreateSeason = (props: P) => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);
  const [seasonData, setSeasonData] = useState<Season>({
    name: "",
    season_number: 1,
    is_set: false,
    showId: props.showId,
    poster_path: "",
    episodes: [],
  });
  const [poster, setPoster] = useState<FileUploader>({
    path: "",
    file: undefined,
    preview: "",
  });
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episode, setEpisode] = useState<Episode>({
    name: "",
    description: "",
    number: 1
  });
  const [episodePoster, setEpisodePoster] = useState<FileUploader>({
    path: "",
    file: undefined,
    preview: "",
  });
  const [episodeVideo, setEpisodeVideo] = useState<FileUploader>({
    path: "",
    file: undefined,
    preview: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createSeasonMutation, { data, loading, error }] =
    useCreateSeasonMutation();

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
    setIsAddingEpisode(false);
    setEpisodes([
      ...episodes,
      {
        ...episode,
        number: episodes.length + 1,
        image: episodePoster.file,
        path: episodeVideo.file,
      },
    ]);
    setEpisode({
      name: "",
      description: "",
      number: episodes.length + 2,
      path: undefined,
      image: undefined,
    });
    setEpisodePoster({
      path: "",
      file: new File([""], "filename"),
      preview: "",
    });
    setEpisodeVideo({
      path: "",
      file: new File([""], "filename"),
      preview: "",
    });
  };

  const handleDiscardChanges = () => {
    setEpisode({
      name: "",
      description: "",
      number: episode.number + 1,
      path: undefined,
      image: undefined,
    });
    setIsAddingEpisode(false);
  }

  const handleRemoveEpisode = (index: number) => {
    const updatedEpisodes = episodes
      .filter((_, i) => i !== index)
      .map((ep, i) => ({
        ...ep,
        number: i + 1,
      }));
    setEpisodes(updatedEpisodes);
  };
  

  const handleSubmit = async (): Promise<void> => {
    if(isAddingEpisode) {
      setOpenSnackbar(true)
      return
    }
    try {
      const updatedEpisodes = await Promise.all(
        episodes.map(async (ep) => {
          if (ep.image && ep.path) {
            const posterFormData = new FormData();
            posterFormData.append("file", ep.image);
            console.log(ep.image);
            const videoFormData = new FormData();
            videoFormData.append("file", ep.path);

            const [posterResponse, videoResponse] = await Promise.all([
              axios.post(
                `${process.env.REACT_APP_ASSETS_URL}/upload/posters`,
                posterFormData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              ),
              axios.post(
                `${process.env.REACT_APP_ASSETS_URL}/upload/episodeVideos`,
                videoFormData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              ),
            ]);
            return {
              ...ep,
              image: posterResponse.data.fileName,
              path: videoResponse.data.fileName,
            };
          }
          return ep;
        })
      );
      let posterFileName = "";
      if (poster.file) {
        const posterFormData = new FormData();
        posterFormData.append("file", poster.file);

        const posterResponse = await axios.post(
          process.env.REACT_APP_ASSETS_URL + `/upload/posters`,
          posterFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        posterFileName = posterResponse.data.fileName;
      }
      console.log(seasonData);
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
      console.log(seasonInput);
      await createSeasonMutation({
        variables: {
          input: seasonInput,
        },
        refetchQueries: [
          {
            query: GetSeasonByShowDocument,
            variables: { id: seasonInput.showId },
          },
        ],
      });

      handleClose();
    } catch (error) {
      console.error("Error creating season:", error);
    }
  };

  const handlePosterUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if(file){
      const preview = URL.createObjectURL(file);
      setPoster({ path: "posters", file, preview });
    }
  };

  const handleEpisodePosterUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setEpisodePoster({ path: "episode_posters", file, preview });
  };

  const handleEpisodeVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setEpisodeVideo({ path: "episode_videos", file, preview });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const steps = ["Create Season", "Add Episodes"];
  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className="CreateSeason">
      <IconButton
        onClick={handleOpen}
        aria-label="add season"
        size="large"
        style={{ color: "white" }}
      >
        <Add fontSize="inherit" />
      </IconButton>
      <CustomDialog
        open={open}
        onClose={handleClose}
        className="CreateSeason-Modal"
        fullWidth
        maxWidth="sm"
      >
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackBar}
          autoHideDuration={5000}
          color="warning"
          message="You are still adding an episode! Click the button to add or discard it!"
        />
        <DialogTitle>Create Season</DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={activeStep} style={{ marginBottom: "20px" }}>
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
                  <InputFileUpload
                    name="Upload Poster"
                    handleChange={handlePosterUpload}
                  />
                  {poster.preview && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">
                        Poster Preview:
                      </Typography>
                      <img
                        src={poster.preview}
                        alt="Poster Preview"
                        style={{ width: "240px", height: "360px" }}
                      />
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
                  <div className="CreateSeason-Modal-UploadButtons">
                    <div>
                      <InputFileUpload
                        name="Upload Episode Poster"
                        handleChange={handleEpisodePosterUpload}
                      />
                      {episodePoster.preview && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Episode Poster Preview:</Typography>
                          <img
                            src={episodePoster.preview}
                            alt="Episode Poster Preview"
                            style={{ width: "275px", maxHeight: "180px" }}
                          />
                        </Box>
                      )}
                    </div>
                    <div>
                      <InputFileUpload
                        name="Upload Episode Video"
                        handleChange={handleEpisodeVideoUpload}
                      />
                      {episodeVideo.preview && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Video Preview:</Typography>
                          <video width="100%" controls>
                            <source src={episodeVideo.preview} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Box>
                      )}
                    </div>
                  </div>
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddEpisode}
                  >
                    Add Episode
                  </Button>
              </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Episodes:</Typography>
                  <Box style={{ maxHeight: "150px", overflowY: "auto" }}>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                      {episodes.length > 0 ? episodes.map((ep, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>{ep.number}. {ep.name}</span>
                          <IconButton
                            onClick={() => handleRemoveEpisode(index)}
                            aria-label="delete episode"
                          >
                            <Delete color="secondary" />
                          </IconButton>
                        </li>
                      )):
                      <div>The list is empty!</div>
                      }
                    </ul>
                  </Box>
                </Grid>
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
      </CustomDialog>
    </div>
  );
};

export default CreateSeason;
