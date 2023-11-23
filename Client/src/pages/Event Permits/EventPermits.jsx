import './EventPermits.module.css';
import classes from './EventPermits.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.jpg';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
    Carousel,
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
    Chip,
    Input,
    Select,
    Option,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
    ArrowLeftIcon
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import Footer from '../../Components/Footer';



// profile menu component
const profileMenuItems = [
  {
    label: "Gestionar eventos",
  },
  {
    label: "Crear evento",
  },
  {
    label: "Sign Out",
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleMenuClick = (label) => {
  if (label === "Gestionar eventos") {
      navigate('/admin-event');
  } else if (label === "Crear evento") {
      navigate('/admin-event/createevent');
  } else if (label === "Sign Out") {
      navigate('/');
  }
  };
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={ () => handleMenuClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Typography
                as="span"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

  
export default function EventsPermit() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { eventCode } = useParams();
    const { user,token } = useUserContext();
    const [event, setEvent] = useState([]);

    const editEventClick = (eventCode) => {
      navigate(`/admin-event/modifyevent/${eventCode}`);
    }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if(token){
        setLoading(true);
        eventService.getEventById(eventCode,token)
            .then((data) => {
              setEvent(data);          
                console.log('evento obtenido:', event);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener las eventos:', error);
            });
        }
    }, [token]);

    const [eventIsActive, setEventIsActive] = useState(event.active); 
    
    const editstatusEventClick = () => {
    eventService.changeEventStatus(eventCode, token)
    .then(response => {
        console.log('El estado del evento ha cambiado con éxito:', response);
        event.active = !event.active;
        setEventIsActive(!eventIsActive);
    })
    .catch(error => {
        console.error('Hubo un error al cambiar el estado del evento:', error);
    });
    };

    let buttonText = event.active ?  "Deshabilitar evento":"Habilitar evento" ;

    const navigate = useNavigate();

    const handleModifyEventClick = () => {
        navigate('/admin-event/modifyevent');
    }

    const handleModifyStaffClick = (eventCode) => {
        navigate(`/admin-event/modifystaff/${eventCode}`);
    }

    const handleDisableEventClick = () => {
        navigate('/admin-event/');
    }

    const handleBackClick = () => {
      navigate('/admin-event/');
  }

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Event Permits";
        }, []);

    return (
      <div className={[classes["generalContainer"]]}>
      <header className={[classes["headerContainer"]]}>
    <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
    <div className={[classes["headerTypography"]]}>
      <img src={logo} alt="logo" className="h-12 w-12 mx-4" />
      <Typography
        as="a"
        href="#"
        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
      >
        Guanaco Business
      </Typography>
      
      <ProfileMenu />
      </div>
  </Navbar>
    </header>
      <IconButton 
      onClick = {handleBackClick}
      size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                <ArrowLeftIcon className="h-6 w-6 text-white" />
            </IconButton>
            <div className="flex flex-col min-h-screen"> 
        <div className={[classes["bodyContainer"]]}>
            <div className={[classes["imgContainer"]]}>
            <img src={event.image}
             alt="eventImg" className={[classes["imgEvent"]]}/>
            </div>
            
            <div className={[classes["infoEventContainer"]]}>           
            <div className={[classes["textContainer"]]}>               
                <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["eventTitle"]]}> {event.title} </h1>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Fecha:</p>
                <p className={[classes["title2"]]}>{event.date}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Hora:</p>
                <p className={[classes["title2"]]}>{event.time}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Participantes:</p>
                <p className={[classes["title2"]]}>{event.involvedPeople}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Patrocinadores:</p>
                <p className={[classes["title2"]]}>{event.sponsors}</p>
                </div>
                </div>
                <div className={[classes["buttonContainer"]]}>
                <div className={[classes["buttonmodifyContainer"]]}>
                <button 
                onClick={() =>editEventClick(event.code)}
                className={[classes["modifyEventButton"]]}>Modificar datos del evento</button>
            </div>
                <div className={[classes["buttonmodifyStaffContainer"]]}>
                <button 
                onClick={() =>handleModifyStaffClick(event.code)}
                className={[classes["modifyStaffButton"]]}>Asignar personal</button>
                </div>
                </div>
                <div className={[classes["buttonDisableContainer"]]}>
                <button 
                    onClick={editstatusEventClick}
                    style={{ backgroundColor: event.active ? 'red' : 'green' }}
                    className={[classes["buttonDisableContainer"]]}
                    >
                    {buttonText}
                </button>
                </div>
            </div>
            
            </div>
        </div>
        <Footer/>
    </div>
    );
}