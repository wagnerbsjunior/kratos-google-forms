function createProductContactForm() {
  var productName = 'Produto X';
  var form = FormApp.create('Contato - ' + productName);

  form
    .setTitle('Contato - ' + productName)
    .setDescription('Conte-nos como podemos ajudar. Escolha Suporte ou Vendas e preencha os detalhes. Retornaremos em breve!')
    .setCollectEmail(true)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setShowProgressBar(true)
    .setConfirmationMessage('Obrigado! Recebemos sua solicitação. Nossa equipe entrará em contato em breve.');

  // Cria planilha de destino para respostas
  var sheet = SpreadsheetApp.create('Respostas - ' + productName);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Página inicial: pergunta de roteamento
  form.addSectionHeaderItem()
    .setTitle('Como podemos ajudar?')
    .setHelpText('Escolha uma das opções abaixo para direcionarmos seu atendimento.');

  var reasonItem = form.addMultipleChoiceItem()
    .setTitle('Motivo do contato')
    .setRequired(true)
    .setHelpText('Selecione para direcionar você à seção correta.');

  // Seções (páginas) de Suporte, Vendas e Finalização
  var supportPage = form.addPageBreakItem().setTitle('Suporte');

  // Suporte: campos
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Empresa (opcional)').setRequired(false);

  // Como o Forms já coleta email automaticamente, mantemos apenas telefone opcional
  var phoneValidation = FormApp.createTextValidation()
    .setHelpText('Use apenas números, espaços, +, -, ou parênteses')
    .requireTextMatchesPattern('^[0-9+\-()\s]{7,}$')
    .build();
  form.addTextItem()
    .setTitle('Telefone (opcional)')
    .setHelpText('Ex.: +55 (11) 99999-0000')
    .setValidation(phoneValidation)
    .setRequired(false);

  form.addTextItem().setTitle('Produto / Versão (opcional)').setRequired(false);

  var urgency = form.addMultipleChoiceItem()
    .setTitle('Urgência')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Baixa'),
      form.addMultipleChoiceItem().createChoice('Média'),
      form.addMultipleChoiceItem().createChoice('Alta')
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Descrição do problema')
    .setHelpText('Inclua passos para reproduzir, mensagens de erro e impacto.')
    .setRequired(true);

  var salesPage = form.addPageBreakItem().setTitle('Vendas');

  // Vendas: campos
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('Empresa').setRequired(true);
  form.addTextItem().setTitle('Cargo (opcional)').setRequired(false);

  form.addTextItem()
    .setTitle('Telefone (opcional)')
    .setHelpText('Ex.: +55 (11) 99999-0000')
    .setValidation(phoneValidation)
    .setRequired(false);

  form.addListItem()
    .setTitle('Tamanho da empresa')
    .setChoiceValues(['1-10', '11-50', '51-200', '201-500', '500+'])
    .setRequired(true);

  form.addListItem()
    .setTitle('Orçamento estimado')
    .setChoiceValues(['Até R$ 5k', 'R$ 5k - 20k', 'R$ 20k - 100k', 'Acima de R$ 100k', 'Ainda avaliando'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Caso de uso')
    .setHelpText('Descreva objetivos, prazos e requisitos principais.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Preferência de contato')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Email'),
      form.addMultipleChoiceItem().createChoice('Telefone')
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Consentimento')
    .setHelpText('Autorizo o contato para fins de suporte ou comercial, conforme a Política de Privacidade.')
    .setChoiceValues(['Autorizo'])
    .setRequired(true);

  var endPage = form.addPageBreakItem().setTitle('Finalizar');
  form.addSectionHeaderItem()
    .setTitle('Confira e envie')
    .setHelpText('Clique em Enviar para concluir.');

  // Ramificação: envia Suporte → Finalizar e Vendas → Finalizar
  supportPage.setGoToPage(endPage);
  salesPage.setGoToPage(endPage);

  // Configura escolhas do item de motivo para irem às respectivas seções
  reasonItem.setChoices([
    reasonItem.createChoice('Suporte', supportPage),
    reasonItem.createChoice('Vendas', salesPage)
  ]);

  // Move o item de motivo para o topo (antes das páginas)
  form.moveItem(reasonItem, 1);

  // Logs úteis
  Logger.log('Form URL: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Planilha de respostas: ' + sheet.getUrl());
}
