export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const actionGetToken = (data) => ({
  type: GET_TOKEN,
  data,
});

export const actionGetQuestions = (data) => ({
  type: GET_QUESTIONS,
  data,
});

export const getApiToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(actionGetToken(data));
    return data.token;
  } catch (error) {
    console.log(`Erro encontrado Token API: ${error}`); // Provisório
  }
};

export const getApiQuestions = async (token, quantity) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${quantity}&token=${token}`);
    console.log(token);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Erro encontrado Token API: ${error}`); // Provisório
  }
};

export const getQuestions = (token, quantity) => async (dispatch) => {
  const questions = await getApiQuestions(token, quantity);
  dispatch(actionGetQuestions(questions));
};
