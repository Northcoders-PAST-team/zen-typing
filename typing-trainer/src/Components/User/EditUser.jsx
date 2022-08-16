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
  const phoneRegex =
    /^\+?[0-9]{1,3}?[-\s]?\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;

  const emailRegex = /[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/;

  const checkNumber = (e) => {
    e.preventDefault();
    phoneRegex.test(e.target.value)
      ? setPhone(e.target.value)
      : setInputError("incorrect phone number");
  };
  const checkEmail = (e) => {
    e.preventDefault();
    emailRegex.test(e.target.value)
      ? setEmail(e.target.value)
      : setInputError("incorrect Email");
  };
  const checkDisplayname = (e) => {
    e.preventDefault();
    setDisplayname(e.target.value);
  };

  console.log(user.displayName);

  return (
    <div className="form-container">
      <form
        onSubmit={() => {
          submitData();
        }}
        className="user-form"
      >
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
        <input
          type="text"
          name="email"
          id=""
          className="form-text-input"
          placeholder="Email"
          onChange={(e) => {
            checkEmail(e);
          }}
        />
        <input
          type="text"
          name="phone"
          id=""
          className="form-text-input"
          placeholder="Phone number"
          onChange={(e) => {
            checkNumber(e);
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
