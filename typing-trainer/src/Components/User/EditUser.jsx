import { Button } from "@mui/material";

const EditUser = ({
  setEdit,
  user,
  setEmail,
  setPhone,
  setDisplayname,
  setInputError,
  submitData,
}) => {
  const checkDisplayname = (e) => {
    e.preventDefault();
    setDisplayname(e.target.value);
  };

  console.log(user);

  return (
    <div className="form-container">
      <form onSubmit={submitData} className="user-form">
        <h2 className="form-title">Edit profile Data</h2>

        <input
          type="text"
          name="displayName"
          id=""
          className="form-text-input"
          placeholder="Display name"
          onChange={(e) => {
            checkDisplayname(e);
          }}
        />

        <Button variant="contained" size="large" type="submit">
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => {
            setEdit(false);
          }}
        >
          Discard
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
