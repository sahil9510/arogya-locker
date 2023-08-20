import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineDocument } from "react-icons/hi2";
import { RiPencilLine } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";
import "../CSS/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, changeloginas } from "../../store/loginslice";
import { changeTab, changeDTab } from "../../store/sidebarslice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ptab = useSelector((state) => state.sidebar.currtabP);
  const dtab = useSelector((state) => state.sidebar.currtabD);
  const loginas = useSelector((state) => state.login.loginas);

  const handlelogout = () => {
    dispatch(changeloginas("none"));
    dispatch(changeUser(null));
    navigate("/");
    // window.location.reload(true); //comment on while testing .
  };

  return (
    <>
      <div id="header">
        <ProSidebar>
          <SidebarContent>
            <Menu iconShape="square">
              {loginas === "patient" ? (
                <>
                  <MenuItem
                    active={ptab === "doctors"}
                    onClick={() => dispatch(changeTab("doctors"))}
                    icon={<FaUserDoctor />}
                  >
                    Doctors
                  </MenuItem>
                  <MenuItem
                    active={ptab === "prescriptions"}
                    onClick={() => dispatch(changeTab("prescriptions"))}
                    icon={<FaList />}
                  >
                    Prescriptions
                  </MenuItem>
                  <MenuItem
                    active={ptab === "reports"}
                    onClick={() => dispatch(changeTab("reports"))}
                    icon={<RiPencilLine />}
                  >
                    Reports
                  </MenuItem>
                  <MenuItem
                    active={ptab === "documents"}
                    onClick={() => dispatch(changeTab("documents"))}
                    icon={<HiOutlineDocument />}
                  >
                    Documents
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
              {loginas === "doctors" ? (
                <>
                  <MenuItem
                    active={dtab === "patients"}
                    onClick={() => dispatch(changeDTab("patients"))}
                    icon={<FaList />}
                  >
                    Requests
                  </MenuItem>
                  <MenuItem
                    active={dtab === "reports"}
                    onClick={() => dispatch(changeDTab("reports"))}
                    icon={<RiPencilLine />}
                  >
                    Reports
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
              {loginas === "diagnostic" ? (
                <>
                  <MenuItem active={true} icon={<FaList />}>
                    Reports
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
              {loginas === "hospital" ? (
                <>
                  <MenuItem active={true} icon={<FaUserDoctor />}>
                    Doctors
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <div onClick={handlelogout}>
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </div>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;

// export default Siidebar;
