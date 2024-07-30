
export const getTodaysBirthday = async () => {
  let queryUrl = `http://localhost:3002/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const register = async (firstname,lastname,email,password) => {
  try{
    console.log(firstname,lastname,email,password)
    return await (await fetch('http://localhost:3002/register',{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({'firstname':firstname,'lastname':lastname,'email':email,'password':password})
    })).json()
  }catch(err){
    return false
  }
}

export const login = async (email,password) => {
  try{
    console.log(email,password)
    return await (await fetch('http://localhost:3002/login',{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({'email':email,'password':password})
    })).json()
  }catch(err){
    return false
  }
}

export const addBirthday = async (firstname,lastname,birthdate,email) => {
  const token = localStorage.getItem('token');
  console.log(token)
  try{
    return await (await fetch('http://localhost:3002/addBirthday', {
      method : "POST",
      headers: {
        'Authorisation' : 'Bearer ' + token,
      },
      body: JSON.stringify({'birthday' : birthdate, 'firstname':firstname,'lastname':lastname,'email':email}),
    },
    )).json()
  }catch(err){
    return false
  }
}

export const getRandomQuote = async () => {
  let queryUrl = `http://localhost:3002/getQuote`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};
