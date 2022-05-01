import ReactAudioPlayer from 'react-audio-player';
export default function PlayBar({musicURL}) {
  return (
    <div className="footer-container">
    <ReactAudioPlayer
      src={musicURL}
      autoPlay
      controls
  />
    </div>
  );
}
