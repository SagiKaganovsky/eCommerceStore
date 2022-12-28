import { Button, Menu, MenuItem } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { accountActions } from "../../store/accountSlice";

const SignedInMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button {...bindTrigger(popupState)}>{user?.email}</Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My orders</MenuItem>
            <MenuItem
              onClick={() => {
                popupState.close();
                dispatch(accountActions.signOut());
                navigate("/", { replace: true });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};

export default SignedInMenu;