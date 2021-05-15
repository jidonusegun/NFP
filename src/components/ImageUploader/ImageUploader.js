import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import logos from 'assets/img/logos.png';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    imgPreview: {
        width: "200px",
        height: "180px",
        border: "1px solid gray",
    },
    fileInput: {
      fontSize: "3rem",
      position: "absolute",
      top: "-7rem",
      left: "5rem",
    },
    img: {
      maxWidth: "200px",
      maxHeight: "180px",
    },
}))

export default function ImageUploader() {
  const classes = useStyles();
    const [imageFile, setImageFile] = useState({file: '',imagePreviewUrl: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle uploading-', imageFile.file);
      }

      const handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          setImageFile({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

      let {imagePreviewUrl} = imageFile;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="upload" className={classes.img} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }
      
    return (
        <div className="previewComponent">
          <div className={classes.imgPreview}>
            {$imagePreview}
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="filePicker">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera fontSize="large" className={classes.fileInput} />
              </IconButton>
            </label>
            <input id="filePicker" style={{visibility:"hidden"}}  
              type="file" 
              onChange={handleImageChange} />
          </form>
        </div>
    )
}
