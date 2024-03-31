/* eslint-disable react/prop-types */
import { tokeOverSession } from "../../../service/http-service/login.service";
import { setData } from "../../../utils/Cookies.utils";
import "./Takeover.css";

function Takeover({ open, close, data, login }) {
  const handleContinue = async () => {
    await tokeOverSession(data)
      .then((data) => {
        setData("token", data.token);
        login();
      })
      .catch((err) => {
        console.log(err.message);
      });
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <dialog className="takeover-dialog" open={open}>
      <h3>Active Session</h3>
      <p style={{ textAlign: "justify" }}>
        You currently have an active session with this user name. Select
        Continue to terminate the other session and proceed with this session,
        or click Cancel to terminate this login.
      </p>
      <div style={{ float: "right" }}>
        <button
          className="ux-button"
          style={{ marginRight: "10px" }}
          onClick={handleContinue}
        >
          Continue
        </button>
        <button className="ux-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </dialog>
  );
}

export default Takeover;
