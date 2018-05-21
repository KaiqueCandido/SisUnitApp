function iniciarJquery(){
	window.innerWidth <= 992 ? $(".button-collapse").sideNav({'closeOnClick': true}) : $(".button-collapse").sideNav();
	$('.collapsible').collapsible();	    
	$('.modal').modal();
	$('.tooltipped').tooltip({delay: 50});		
	$('ul.tabs').tabs();
	$('input, textarea').characterCounter();
	$('.datepicker').pickadate({
		monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
		weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
		today: 'Hoje',
		clear: 'Limpar',
		close: 'Pronto',
		labelMonthNext: 'Próximo mês',
		labelMonthPrev: 'Mês anterior',
		labelMonthSelect: 'Selecione um mês',
		labelYearSelect: 'Selecione um ano',
		selectMonths: true, 
		format: 'dd/mm/yyyy',
		max: new Date(),		
		selectYears: 100,
		closeOnSelect: true
	});

	setTimeout(function (){
		$('select').material_select();
	}, 500);
}

window.addEventListener('resize', function(){
	iniciarJquery();
});
