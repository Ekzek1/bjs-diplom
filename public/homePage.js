const logoutButton = new LogoutButton();

logoutButton.action = () =>{

    ApiConnector.logout(resp =>{
        if(resp.success){
            location.reload()
        }
    })
}

ApiConnector.current = (resp => {
    if(resp.success){
        ProfileWidget.showProfile(resp.data);
    }
});

const ratesBoard = new RatesBoard();

function getСourse() {
    ApiConnector.getStocks(resp => {
        if(resp.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(resp.data);
        }
    });
}

getСourse();
setTimeout(
    getСourse, 
60000);


// Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) =>{
    ApiConnector.addMoney(data, resp =>{
        if(resp.success){
            ProfileWidget.showProfile(resp.data);
            moneyManager.setMessage(resp.success, 'Баланс пополнен');
        }else {
            moneyManager.setMessage(resp.success, resp.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) =>{
    ApiConnector.convertMoney(data, resp =>{
        if(resp.success){
            ProfileWidget.showProfile(resp.data);
            moneyManager.setMessage(resp.success, 'Конвертация прошла успешно!');
        }else {
            moneyManager.setMessage(resp.success, resp.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) =>{
    ApiConnector.transferMoney(data, resp =>{
        if(resp.success){
            ProfileWidget.showProfile(resp.data);
            moneyManager.setMessage(resp.success, 'Перевод прошел успешно!');
        }else {
            moneyManager.setMessage(resp.success, resp.error);
        }
    })
}


//Работа с избранным

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(resp => {
	if(resp.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(resp.data);
		moneyManager.updateUsersList(resp.data);
	}
})

favoritesWidget.addUserCallback = (data) =>{
    ApiConnector.addUserToFavorites(data, resp =>{
        if(resp.success){
            favoritesWidget.clearTable();
		    favoritesWidget.fillTable(resp.data);
		    moneyManager.updateUsersList(resp.data);
            moneyManager.setMessage(resp.success, 'Пользователь в избранном');
        }else {
            moneyManager.setMessage(resp.success, resp.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) =>{
    ApiConnector.removeUserFromFavorites(data, resp =>{
        if(resp.success){
            favoritesWidget.clearTable();
		    favoritesWidget.fillTable(resp.data);
		    moneyManager.updateUsersList(resp.data);
            moneyManager.setMessage(resp.success, 'Пользователь удален');
        }else {
            moneyManager.setMessage(resp.success, resp.error);
        }
    })
}