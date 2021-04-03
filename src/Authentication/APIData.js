var basicAuth = 'Basic ' + btoa('admin' + ':' + 'admin');
export const APIData = {
        api: 'http://103.142.165.146:8080/smarter-learnings/',
        headers: {'Authorization': basicAuth },
        url:'http://localhost/'
    }