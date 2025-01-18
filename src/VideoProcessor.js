import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Upload, Loader2 } from "lucide-react";

const VideoProcessor = () => {
  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setVideo) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const processVideos = async () => {
    if (!video1 || !video2) {
      alert("Please upload both videos.");
      return;
    }

    setLoading(true);

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Fetch video files
    await ffmpeg.FS("writeFile", "video1.mp4", await fetchFile(video1));
    await ffmpeg.FS("writeFile", "video2.mp4", await fetchFile(video2));

        // Combine the videos vertically and resize them to 9:16 ratio
    await ffmpeg.run(
    "-i", "video1.mp4", 
    "-i", "video2.mp4", 
    "-filter_complex", "[0:v]scale=1080:1920,setsar=1[v1]; [1:v]scale=1080:1920,setsar=1[v2]; [v1][v2]vstack=inputs=2[v]",
    "-map", "[v]",
    "-c:v", "libx264", 
    "-crf", "23", 
    "-preset", "fast",
    "-t", "6", // Adjust duration (6 seconds in this case)
    "output.mp4"
    );
    const outputFile = ffmpeg.FS("readFile", "output.mp4");
    const outputBlob = new Blob([outputFile.buffer], { type: "video/mp4" });
    const outputUrl = URL.createObjectURL(outputBlob);

    setOutputVideo(outputUrl);
    setLoading(false);
  };

  return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #e0f2fe, #6366f1)", padding: "2rem" }}>

          <div style={{ maxWidth: "48rem", margin: "0 auto", background: "#fff", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "2rem" }}>
              
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem", color: "#4b5563" }}>
          Уникализировать видео
        </h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ position: "relative" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#6b7280", marginBottom: "0.5rem" }}>
                <p>Видео, которое будет сверху:</p>
              </label>
              <div style={{ position: "relative", border: "2px dashed #d1d5db", borderRadius: "0.75rem", padding: "1.5rem", cursor: "pointer", transition: "border-color 0.3s", textAlign: "center" }}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, setVideo1)}
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                />
                <div>
                  <Upload style={{ height: "3rem", width: "3rem", color: "#9ca3af", marginBottom: "0.5rem" }} />
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {video1 ? "Первое видео загружено" : "Загрузить первое видео"}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#6b7280", marginBottom: "0.6rem" }}>
                 <p>Видео, которое будет снизу:</p>
              </label>
              <div style={{ position: "relative", border: "2px dashed #d1d5db", borderRadius: "0.75rem", padding: "1.5rem", cursor: "pointer", transition: "border-color 0.3s", textAlign: "center" }}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, setVideo2)}
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                />
                <div>
                  <Upload style={{ height: "3rem", width: "3rem", color: "#9ca3af", marginBottom: "0.5rem" }} />
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {video2 ? "Второе видео загружено" : "Загрузить второе видео"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
<button
        onClick={processVideos}
        disabled={loading || !video1 || !video2}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4f46e5",
          color: "#fff",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: loading || !video1 || !video2 ? "not-allowed" : "pointer",
          opacity: loading || !video1 || !video2 ? 0.5 : 1,
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {loading ? (
          <>
            <Loader2
              className="animate-spin"
              style={{
                marginLeft: "-0.25rem",
                marginRight: "0.75rem",
                height: "1.25rem",
                width: "1.25rem",
                animation: "spin 1s linear infinite", // Добавлена анимация вращения
              }}
            />
            Уникализирую...
          </>
        ) : (
          "Уникализировать"
        )}
      </button>
          </div>

          {outputVideo && (
            <div style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#4b5563" }}>
                Processed Video
              </h2>
              <div style={{ position: "relative", width: "100%", maxWidth: "25rem", margin: "0 auto", aspectRatio: "9 / 16", backgroundColor: "#000", borderRadius: "0.75rem", overflow: "hidden" }}>
                <video
                  controls
                  style={{
                    position: "absolute", 
                    inset: "0", 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain"
                  }}
                >
                  <source src={outputVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoProcessor;
