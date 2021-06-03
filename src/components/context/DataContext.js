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
        { id: 1, state: "Abia", image: "/media/img/Abia.jpg"},
        { id: 2, state: "Adamawa", image: "/media/img/Adamawa.jpg"},
        { id: 3, state: "Akwa Ibom", image: "/media/img/AkwaIbom.jpg"},
        { id: 4, state: "Anambra", image: "/media/img/Anambra.jpg"},
        { id: 5, state: "Bauchi", image: "/media/img/Bauchi.jpg"},
        { id: 6, state: "Bayelsa", image: "/media/img/Bayelsa.jpg"},
        { id: 7, state: "Benue", image: "/media/img/Benue.jpg"},
        { id: 8, state: "Borno", image: "/media/img/Borno.jpg"},
        { id: 9, state: "Cross River", image: "/media/img/CrossRiver.jpg"},
        { id: 10, state: "Delta", image: "/media/img/Delta.jpg"},
        { id: 11, state: "Ebonyi", image: "/media/img/Ebonyi.jpg"},
        { id: 12, state: "Edo", image: "/media/img/Edo.jpg"},
        { id: 13, state: "Ekiti", image: "/media/img/Ekiti.jpg"},
        { id: 14, state: "Enugu", image: "/media/img/Enugu.jpg"},
        { id: 15, state: "Gombe", image: "/media/img/Gombe.jpg"},
        { id: 16, state: "Imo", image: "/media/img/Imo.jpg"},
        { id: 17, state: "Jigawa", image: "/media/img/Jigawa.jpg"},
        { id: 18, state: "Kaduna", image: "/media/img/Kaduna.png"},
        { id: 19, state: "Kano", image: "/media/img/Kano.jpg"},
        { id: 20, state: "Katsina", image: "/media/img/Katsina.jfif"},
        { id: 21, state: "Kebbi", image: "/media/img/Kebbi.jpg"},
        { id: 22, state: "Kogi", image: "/media/img/Kogi.jpg"},
        { id: 23, state: "Kwara", image: "/media/img/Kwara.jpg"},
        { id: 24, state: "Lagos", image: "/media/img/Lagos.jpg"},
        { id: 25, state: "Nasarawa", image: "/media/img/Nasarawa.png"},
        { id: 26, state: "Niger", image: "/media/img/Niger.jpg"},
        { id: 27, state: "Ogun", image: "/media/img/Ogun.jpg"},
        { id: 28, state: "Ondo", image: "/media/img/Ondo.jpg"},
        { id: 29, state: "Osun", image: "/media/img/Osun.jpg"},
        { id: 30, state: "Oyo", image: "/media/img/Oyo.jpg"},
        { id: 31, state: "Plateau", image: "/media/img/Plateau.jpg"},
        { id: 32, state: "Rivers", image: "/media/img/Rivers.jpg"},
        { id: 33, state: "Sokoto", image: "/media/img/Sokoto.jpg"},
        { id: 34, state: "Taraba", image: "/media/img/Taraba.jpg"},
        { id: 35, state: "Yobe", image: "/media/img/Yobe.jpg"},
        { id: 36, state: "Zamfara", image: "/media/img/Zamfara.jpg"}
      ]

    
    

    return (
        <dataContext.Provider value={{open, handleClickOpen, handleClose, 
          openDelete, handleClickOpenDelete, handleCloseDelete, openSuspend, handleClickOpenSuspend, handleCloseSuspend, openView, handleClickOpenView, handleCloseView,
          anchorEl, handleClickPop, handleClosePop, userProfile, state, notification,handleCloseNotification, handleClickOpenNotification, openNotification, token, setToken, anchorElSuper, handleClickPopSuper, handleClosePopSuper}}>
            {props.children}
        </dataContext.Provider>
    )
}
