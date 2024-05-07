let testSendMail = false;

const setTestSendMail = (data) => {
    testSendMail = data;
}

const getTestSendMail = () => {
    return testSendMail;
}

module.exports = {setTestSendMail, getTestSendMail}