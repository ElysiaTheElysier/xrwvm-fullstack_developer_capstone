import React, { useState } from 'react';

const Register = () => {
  return (
    <form>
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="firstname" placeholder="First Name" />
      <input type="text" name="lastname" placeholder="Last Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};
export default Register;
