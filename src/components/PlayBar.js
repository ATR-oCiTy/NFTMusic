import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

{
const Playbar = ({ children }) => (
  <div
    className="song-details"
    
  >
    {children}
  </div>
)
}

export default function PlayBar({musicURL}) 
  {return (
    
    <div className={"song-details"}>
    
    <AudioPlayer
      src={musicURL}
      autoPlay
      controls
      ></AudioPlayer>
    </div>

    
    
    
  );
}
