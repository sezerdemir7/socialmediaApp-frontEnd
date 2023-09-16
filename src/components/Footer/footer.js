import { makeStyles } from '@mui/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    padding: '20px',
    color: '#fff',
    marginBottom:"0px",
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerItem: {
    flex: '1',
    marginRight: '20px',
    
  },
  lastFooterItem: {
    marginRight: 0,
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100px',
    marginTop: '10px',
  },
  socialMediaLink: {
    color: '#fff',
    textDecoration: 'none',
    margin:"5px",
    
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '20px',
    borderTop: '1px solid #fff',
    paddingTop: '10px',
  },
}));

 function CustomFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={`${classes.footerItem} ${classes.lastFooterItem}`}>
          <h3>About Us</h3>
          <p>Sclapp sosyal media demo version</p>
        </div>
        <div className={classes.footerItem}>
          <h3>Contact Us</h3>
          <p>Email: example@example.com</p>
          
        </div>
        <div className={classes.footerItem} style={{alignItems:"center"}}>
        <h3>Follow Us</h3> 
          
           
            <a href="https://github.com/sezerdemir7" target="_blank" rel="noopener noreferrer" className={classes.socialMediaLink}>
              <GitHubIcon/>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={classes.socialMediaLink}>
             <TwitterIcon/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={classes.socialMediaLink}>
              <InstagramIcon></InstagramIcon>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={classes.socialMediaLink}>
              <LinkedInIcon/>
            </a>
          
        </div>
      </div>
      
    </footer>
  );
}
export default CustomFooter;