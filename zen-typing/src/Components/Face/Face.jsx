import { Fragment, useRef, useEffect, useState } from "react";
import "./Face.scss";
import * as faceapi from "face-api.js";

import { Doughnut } from "react-chartjs-2";

export default function Face({
  startCounting,
  emotionLog,
  timeElapsed,
  undetected,
  setUndetected,
  hiddenVideo,
  data,
  setCalm,
  neutral,
  setNeutral,
  happy,
  setHappy,
  surprised,
  setSurprised,
  angry,
  setAngry,
  sad,
  setSad,
  disgusted,
  setDisgusted,
}) {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let currentEmotions = {
    happy: happy,
    surprised: surprised,
    angry: angry,
    disgusted: disgusted,
    sad: sad,
    neutral: neutral,
  };

  let primaryEmotion = !currentEmotions
    ? "neutral"
    : Object.keys(currentEmotions).reduce((a, b) =>
        currentEmotions[a] > currentEmotions[b] ? a : b
      );

  useEffect(() => {
    setCalm(primaryEmotion !== "neutral" ? false : true);
    emotionLog[primaryEmotion] += 1;
  }, [timeElapsed]);

  const [triggerDetectCount, setTriggerDetectCount] = useState(false);

  useEffect(() => {
    if (startCounting && triggerDetectCount) {
      setUndetected((previous) => {
        return previous + 1;
      });
      setTriggerDetectCount(false);
    }
  }, [undetected, triggerDetectCount]);

  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detections[0]) {
        setTriggerDetectCount(true);
      } else {
        setNeutral(detections[0].expressions.neutral - 0.8);
        setHappy(detections[0].expressions.happy);
        setSurprised(detections[0].expressions.surprised);
        setAngry(detections[0].expressions.angry);
        setSad(detections[0].expressions.sad);
        setDisgusted(detections[0].expressions.disgusted);
      }

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  return (
    <div className="faceContainer">
      <Fragment>
        <div className="face">
          <div className="face-video">
            <video
              id="myVideo"
              crossOrigin="anonymous"
              ref={videoRef}
              autoPlay
              muted
              className={hiddenVideo ? "hidden" : ""}
            ></video>
          </div>
          <canvas
            ref={canvasRef}
            className={hiddenVideo ? "hidden" : "face-canvas-" + primaryEmotion}
          />
          <div className="bar-chart">
            <Doughnut
              data={data}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 20,
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </Fragment>
    </div>
  );
}
