/**
 * All the business rules go here
 */
class Business {
  constructor({ room, media, view }) {
    this.media = media;
    this.room = room;
    this.view = view;

    // "File" or "Data stream"
    this.currentStream = {};
  }

  static initialize(deps) {
    const instance = new Business(deps);
    return instance._init();
  }

  /**
   * Initializes the class dependencies
   */
  async _init() {
    this.currentStream = await this.media.getCamera();
    console.log("init!!", this.currentStream);
    this.addVideoStream("meu user");
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;

    this.view.renderVideo({
      userId,
      stream,
      isCurrentId,
    });
  }
}
