export default function PlayBar() {
  return (
    <div className="footer-container">
      <div className="music-detail">
        <h1 className="song"> Something playing .... </h1>
        <p className="singer"> Singer </p>
      </div>
      <div className="button-group">
        <button>
          <img src="/prev-button.svg" height="30px" width="30px" />
        </button>
        <button>
          <img src="/pause-button.svg" height="30px" width="30px" />
        </button>
        <button>
          <img src="/next-button.svg" height="30px" width="30px" />
        </button>
      </div>

      <img src="/music-title.svg" height="100px" width="100px" />
      <style jsx>{`
        .footer-container {
          height: 10vh;
          margin-bottom: 1-10px;
          border: 1px solid white;
          display: flex;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.49);
          opacity: 0.6;
          z-index: 3;
        }
        .music-detail {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: 2%;
          color: white;
        }
        .button-group {
          margin-top: auto;
          margin-bottom: auto;
        }
        button {
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
}
