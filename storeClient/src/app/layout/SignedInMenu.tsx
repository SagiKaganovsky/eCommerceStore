import { Button, Menu, MenuItem } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { accountActions } from "../../store/accountSlice";
import { basketActions } from "../../store/basketSlice";

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
            <MenuItem
              onClick={() => {
                popupState.close();
                navigate("/orders");
              }}
            >
              My orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                popupState.close();
                dispatch(basketActions.clearBasket());
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
