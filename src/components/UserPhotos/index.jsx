import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
} from "@mui/material";

function UserPhotos({ advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel(`/api/photo/${userId}`).then((data) => {
      setPhotos(data || []);
      setCurrentIndex(0);
    });
  }, [userId]);

  if (!Array.isArray(photos)) {
    return <div>Loading photos...</div>;
  }

  if (photos.length === 0) {
    return <div>No photos found.</div>;
  }

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderComments = (comments) => (
    <>
      <Typography variant="h6">Comments:</Typography>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment._id} sx={{ my: 1 }}>
            <Typography variant="body2">
              {comment.user_id ? (
                <Link
                  to={`/users/${comment.user_id}`}
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                >
                  {comment.first_name} {comment.last_name}
                </Link>
              ) : (
                <Typography
                  component="span"
                  sx={{ fontStyle: "italic", color: "gray" }}
                >
                  [Unknown User]
                </Typography>
              )}{" "}
              commented at {new Date(comment.date_time).toLocaleString()}:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {comment.comment}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      )}
    </>
  );

  const renderSinglePhoto = () => {
    const photo = photos[currentIndex];
    return (
      <div>
        <Card key={photo._id} sx={{ marginBottom: 4 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Photo uploaded on ${new Date(
              photo.date_time
            ).toLocaleString()}`}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Uploaded at: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {renderComments(photo.comments || [])}
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentIndex === photos.length - 1}
          >
            Next
          </Button>
        </Stack>
      </div>
    );
  };

  return (
    <div>
      <h2>Photos</h2>
      {advancedFeatures
        ? renderSinglePhoto()
        : photos.map((photo) => (
            <Card key={photo._id} sx={{ marginBottom: 4 }}>
              <CardMedia
                component="img"
                image={`/images/${photo.file_name}`}
                alt={`Photo uploaded on ${new Date(
                  photo.date_time
                ).toLocaleString()}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "600px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Uploaded at: {new Date(photo.date_time).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {renderComments(photo.comments)}
              </CardContent>
            </Card>
          ))}
    </div>
  );
}

export default UserPhotos;
