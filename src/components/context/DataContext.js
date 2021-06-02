import React, {createContext, useState} from 'react';
// import {getContent,postContent,deleteContent,patchContent} from '../../utils';

export const dataContext = createContext();

export default function DataContext(props) {

    const [userProfile] = useState({active: false});

    const [token, setToken] = useState();

    const [open, setOpen] = useState(false);
    const [openNotification, setOpenNotification] = useState(false)

    const notification = [
      {
      id: 1,
      title: "Husbands ask repeated resolved but laughter debating",
      stateAdmin: "Lagos State",
      content: "This is to notify you that your news post has be approved by the admin and your news blog has be updated"
      },
      {
      id: 2,
      content: "This is to notify you that the cooks and aggregators record has been updated"
      },
      {
      id: 3,
      content: "This is to notify you that the cooks record has been updated"
      },
      {
      id: 4,
      content: "This is to notify you that your news post was rejected by the admin"
      },
      {
      id: 5,
      content: "This is to notify you that your news post has be approved by the admin and your news blog has be updated"
      },
      {
      id: 6,
      content: "This is to notify you that your news post has be approved by the admin and your news blog has be updated"
      }
    ]


    const handleClickOpen = () => {
        handleClose()

        setOpen(true);
      };
    
      const handleCloseNotification = () => {
        setOpenNotification(false);
      };

      const handleClickOpenNotification = () => {
        handleCloseNotification()

        setOpenNotification(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const [openDelete, setOpenDelete] = useState(false);

      const handleClickOpenDelete = () => {
        handleCloseDelete()

        setOpenDelete(true);
      };
    
      const handleCloseDelete = () => {
        setOpenDelete(false);
      };

      const [openSuspend, setOpenSuspend] = useState(false);

      const handleClickOpenSuspend = () => {
        handleCloseSuspend()

        setOpenSuspend(true);
      };
    
      const handleCloseSuspend = () => {
        setOpenSuspend(false);
      };

      const [openView, setOpenView] = useState(false);

      const handleClickOpenView = () => {
        handleCloseView()

        setOpenView(true);
      };
    
      const handleCloseView = () => {
        setOpenView(false);
      };

      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClickPop = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClosePop = () => {
        setAnchorEl(null);
      };

      const [anchorElSuper, setAnchorElSuper] = React.useState(null);

      const handleClickPopSuper = (event) => {
        setAnchorElSuper(event.currentTarget);
      };
    
      const handleClosePopSuper = () => {
        setAnchorElSuper(null);
      };

      

      
      const state = [
        { id: 1, state: "Abia", image: require("assets/img/Abia.jpg")},
        { id: 2, state: "Adamawa", image: require("assets/img/Adamawa.jpg")},
        { id: 3, state: "Akwa Ibom", image: require("assets/img/AkwaIbom.jpg")},
        { id: 4, state: "Anambra", image: require("assets/img/Anambra.jpg")},
        { id: 5, state: "Bauchi", image: require("assets/img/Bauchi.jpg")},
        { id: 6, state: "Bayelsa", image: require("assets/img/Bayelsa.jpg")},
        { id: 7, state: "Benue", image: require("assets/img/Benue.jpg")},
        { id: 8, state: "Borno", image: require("assets/img/Borno.jpg")},
        { id: 9, state: "Cross River", image: require("assets/img/CrossRiver.jpg")},
        { id: 10, state: "Delta", image: require("assets/img/Delta.jpg")},
        { id: 11, state: "Ebonyi", image: require("assets/img/Ebonyi.jpg")},
        { id: 12, state: "Edo", image: require("assets/img/Edo.jpg")},
        { id: 13, state: "Ekiti", image: require("assets/img/Ekiti.jpg")},
        { id: 14, state: "Enugu", image: require("assets/img/Enugu.jpg")},
        { id: 15, state: "Gombe", image: require("assets/img/Gombe.jpg")},
        { id: 16, state: "Imo", image: require("assets/img/Imo.jpg")},
        { id: 17, state: "Jigawa", image: require("assets/img/Jigawa.jpg")},
        { id: 18, state: "Kaduna", image: require("assets/img/Kaduna.png")},
        { id: 19, state: "Kano", image: require("assets/img/Kano.jpg")},
        { id: 20, state: "Katsina", image: require("assets/img/Katsina.jfif")},
        { id: 21, state: "Kebbi", image: require("assets/img/Kebbi.jpg")},
        { id: 22, state: "Kogi", image: require("assets/img/Kogi.jpg")},
        { id: 23, state: "Kwara", image: require("assets/img/Kwara.jpg")},
        { id: 24, state: "Lagos", image: require("assets/img/Lagos.jpg")},
        { id: 25, state: "Nasarawa", image: require("assets/img/Nasarawa.png")},
        { id: 26, state: "Niger", image: require("assets/img/Niger.jpg")},
        { id: 27, state: "Ogun", image: require("assets/img/Ogun.jpg")},
        { id: 28, state: "Ondo", image: require("assets/img/Ondo.jpg")},
        { id: 29, state: "Osun", image: require("assets/img/Osun.jpg")},
        { id: 30, state: "Oyo", image: require("assets/img/Oyo.jpg")},
        { id: 31, state: "Plateau", image: require("assets/img/Plateau.jpg")},
        { id: 32, state: "Rivers", image: require("assets/img/Rivers.jpg")},
        { id: 33, state: "Sokoto", image: require("assets/img/Sokoto.jpg")},
        { id: 34, state: "Taraba", image: require("assets/img/Taraba.jpg")},
        { id: 35, state: "Yobe", image: require("assets/img/Yobe.jpg")},
        { id: 36, state: "Zamfara", image: require("assets/img/Zamfara.jpg")}
      ]

    
    

    return (
        <dataContext.Provider value={{open, handleClickOpen, handleClose, 
          openDelete, handleClickOpenDelete, handleCloseDelete, openSuspend, handleClickOpenSuspend, handleCloseSuspend, openView, handleClickOpenView, handleCloseView,
          anchorEl, handleClickPop, handleClosePop, userProfile, state, notification,handleCloseNotification, handleClickOpenNotification, openNotification, token, setToken, anchorElSuper, handleClickPopSuper, handleClosePopSuper}}>
            {props.children}
        </dataContext.Provider>
    )
}
