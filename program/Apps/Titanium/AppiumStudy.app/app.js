Titanium.UI.setBackgroundColor('#000');

var Main = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
    layout: 'vertical'
});

var Valid = Ti.UI.createButton({
	title: 'Valid',
	left: 20
});
var InValid = Ti.UI.createButton({
	title: 'InValid',
	left: 43,
});
var Working = Ti.UI.createButton({
	title: 'Working',
	left: 20
});
var NotWorking = Ti.UI.createButton({
	title: 'NotWorking',
	left: 20
});

Main.add(Valid);
Main.add(InValid);
Main.add(Working);
Main.add(NotWorking);

Main.open({fullscreen: true});

Valid.addEventListener('click',function(e){
   alert('I am live!');
});
Working.addEventListener('click',function(e){
	var Win2 = Titanium.UI.createWindow({  
    	backgroundColor:'#fff'
	});
	Win2.add(Ti.UI.createLabel({text:'I am live!'}));
	Win2.open({fullscreen: true});
});