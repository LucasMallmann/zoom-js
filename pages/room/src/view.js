/**
 * Everythig related to the UI
 */
class View {
  constructor() {}

  createVideoElement({ muted = true, src, srcObject }) {
    const video = document.createElement("video");
    video.muted = muted;
    video.src = src;
    video.srcObject = srcObject;

    if (src) {
      video.controls = true;
      video.loop = true;
      // Wait to play the video
      Util.sleep(200).then((_) => video.play());
    }
    if (srcObject) {
      // When the video is loaded, you can play
      video.addEventListener("loadedmetadata", (_) => video.play());
    }

    return video;
  }

  renderVideo({ userId, stream = null, url = null, isCurrentId = false }) {
    const video = this.createVideoElement({ src: url, srcObject: stream });
    this.appendToHTMLTree(userId, video, isCurrentId);
  }

  appendToHTMLTree(userId, video, isCurrentId) {
    const div = document.createElement("div");
    div.id = userId;
    div.classList.add("wrapper");
    div.append(video);

    const secondDiv = document.createElement("div");
    secondDiv.innerText = isCurrentId ? "" : userId;

    div.append(secondDiv);

    const videoGrid = document.getElementById("video-grid");
    videoGrid.append(div);
  }
}
