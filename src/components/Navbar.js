import { Link } from "@mui/material";

export default function Navbar() {
  return (
    <div className='nav-container'>
      <div className='icon-container'>
        <div className='nav-icon'>
          <Link href='/'>
            <img
              src='/home.svg'
              alt='Picture of the author'
              style={{ cursor: "pointer" }}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className='nav-icon'>
          <Link href='/nft'>
            <img
              src='/search.svg'
              alt='Picture of the author'
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className='nav-icon'>
          <Link href='/user'>
            <img
              src='/profile.svg'
              alt='Picture of the author'
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className='nav-icon' style={{ cursor: "pointer" }}>
          <Link href='/mint'>
            <img
              src='/music.svg'
              alt='Picture of the author'
              width={40}
              height={40}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      <div className='nav-end'>
        <img
          src='/yellow-circle.svg'
          alt='Picture of the author'
          width={40}
          height={40}
        />
      </div>
      <style jsx>{`
        .nav-container {
          border: 1px solid white;
          height: 70vh;
          width: 5vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .nav-icon {
          height: 15vh;
          padding: 1.5em;
        }
        .nav-end {
          padding-bottom: 3em;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
