import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  ThemeProvider,
} from "@material-tailwind/react";
import {
  HeartIcon,
  BellIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import LoginForm from "../../components/LoginForm";
import { Context, ContextRegiter } from "./Home";
import RegisterForm from "../../components/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom";
import * as link from '../../ultils/constant'
import { apiGetCurrent } from "../../services";
import logo from '../../assets/logo.png';
// profile menu component
const profileMenuItems = [

  {
    label: "My Profile",
    icon: UserCircleIcon,
    dispatch: "",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    dispatch: "",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    dispatch: "",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    dispatch: "",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    dispatchAction: actions.logout(),
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const closeMenu = () => setIsMenuOpen(false);

  return (


    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className='flex items-center gap-2'
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, dispatchAction }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const handleClickOn = async () => {
            dispatch(dispatchAction);
          }
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              <span className="flex" onClick={handleClickOn}>
                {React.createElement(icon, {
                  className: `h-4 w-4 mt-0.5 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography

                  as="span"
                  variant="small"
                  className="font-normal ml-6"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}

                </Typography>
              </span>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const iconListItem = [
  {
    icon: HeartIcon,
  },
  {
    icon: BellIcon,
  },
];

function IconList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {iconListItem.map(({ icon }, key) => (
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
        </MenuItem>
      ))}
    </ul>
  );
}

// nav list component
const navListItems = [
  {
    label: "Trang chủ",
    link: "'/profile'",
    key: '1'
  },
  {
    label: "Cho thuê phòng trọ",
    link: "'/createpost'",
    key: '2'
  },
  {
    label: "Nhà cho thuê",
    link: "'/detail'",
    key: '3'
  },
  {
    label: "Cho thuê căn hộ",
    link: '',
    key: '4'
  },
];

function NavList() {


  return (

    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label }, link, { key }) => (
        <NavLink to={link}>
          <Typography
            key={key}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {label}
            </MenuItem>
          </Typography>
        </NavLink>
      ))}
    </ul>

  );
}

export function LoginButton() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useContext(Context);

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <div>
      {/* Button hoặc sự kiện mở khung popup */}
      <button onClick={() => setIsLoginPopupOpen(true)}>Đăng nhập</button>

      {/* Render khung popup nếu isLoginPopupOpen là true */}
      {isLoginPopupOpen && <LoginForm onClose={handleClosePopup} />}
    </div>
  );
}

export function RegisterButton() {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] =
    useContext(ContextRegiter);

  const handleCloseRegisterPopup = () => {
    setIsRegisterPopupOpen(false);
  };

  return (
    <div>
      {/* Button hoặc sự kiện mở khung popup */}
      <button onClick={() => setIsRegisterPopupOpen(true)}>Đăng ký</button>

      {/* Render khung popup nếu isLoginPopupOpen là true */}
      {isRegisterPopupOpen && (
        <RegisterForm onClose={handleCloseRegisterPopup} />
      )}
    </div>
  );
}

export function ComplexNavbar() {
  const dispatch = useDispatch();

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useContext(Context);
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const { currentData } = useSelector(state => state.user)
  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
  };
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 300)
  }, [isLoggedIn])

  useEffect(() => {
    isLoggedIn && setIsLoginPopupOpen(false);
  }, [isLoggedIn]);

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error')
  }, [msg, update])

  return (
    <Navbar className="mx-auto max-w-screen-3xl p-2 lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <img className="mr-4 ml-2 cursor-pointer py-1.5 h-20 w-20" src={logo} />
        <div className="absolute top-2/4 left-1/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <div className="absolute top-2/4 left-2/3 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <IconList />
        </div>
        {isLoggedIn && (
          <>
            {" "}
            <div className="absolute items-center right-[100px]">Xin chào {currentData.name}</div>
            <ProfileMenu />
          </>

        )}

        {!isLoggedIn && (
          <>
            <div className="absolute right-[210px] ">
              <RegisterButton />
            </div>
            <div className="absolute right-[100px] ml-[500px]">
              <LoginButton />
            </div>
          </>
        )}

        {/* <div className="absolute right-[230px] ">
          <RegisterButton />
        </div>
        <div className="absolute right-[100px] ml-[500px]">
          <LoginButton />
        </div> */}
        <NavLink className="absolute top-2/4 left-3/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block" to={'/he-thong/tao-moi-bai-dang'}>
          <Button variant="outlined">Đăng tin</Button>
        </NavLink>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
const Header = () => {
  <ComplexNavbar />;
};

export default Header;
