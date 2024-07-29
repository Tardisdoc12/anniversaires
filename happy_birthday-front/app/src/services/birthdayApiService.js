
export const getTodaysBirthday = async () => {
  let queryUrl = `http://localhost:3002/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const addBirthday = async (firstname,lastname,birthdate,email) => {
  try{
    return await (await fetch('http://localhost:3002/addBirthday', {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
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
