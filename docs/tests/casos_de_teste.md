# Casos de Teste - Velô Sprint (Configurador de Veículo Elétrico)

---

### CT01 - Acessar a Landing Page e iniciar configuração

#### Objetivo
Validar que o usuário consegue acessar a página inicial do Velô Sprint e ser redirecionado corretamente para o Configurador de Veículo.

#### Pré-Condições
- O sistema deve estar online e acessível.
- O usuário deve ter conexão com a internet.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL raiz do sistema. | A Landing Page é carregada corretamente, exibindo as informações iniciais do veículo. |
| 2  | Clicar no botão "Configurar Agora" (ou equivalente). | O usuário é redirecionado para a página do Configurador de Veículo. |

#### Resultados Esperados
- O sistema carrega a Landing Page sem erros e o botão de ação direciona corretamente para a página de configuração.

#### Critérios de Aceitação
- A Landing Page deve ser exibida completamente.
- O link/botão para o configurador deve funcionar sem erros de rota.

---

### CT02 - Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base - Valor Base e Seleção de Cores

#### Objetivo
Validar se as escolhas de cores e rodas ("Sport") refletem corretamente no preço final exibido.


#### Pré-Condições
- Estar na página do Configurador ('/configure').
- Preço base inicial deve ser de R$ 40.00,00 (Cor padrão + Rodas "Aero").

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar o preço inicial de venda | O preço de venda deve ser R$ 40.000,00.|
| 2  | Selecionar uma cor exterior diferente ("Midnight Black" ou "Lunar White") | A cor do veículo no preview é alterada, mas o preço permanece R$ 40.000,00.|
| 3  | Selecionar a opção de roda "Sport Wheels"| A roda do veículo no preview é alterada e o preço total é atualizado com acréscimo de R$ 2.000,00 (Total: R$42.000,00).|
| 4  | Selecionar novamente a roda "Aero Wheels" | O preço total é decrementado em R$ 2.000,00, voltando para R$ 40.000,00 |


#### Resultados Esperados
- O preço dinâmico do veículo deve ser atualizado instantaneamente apenas ao alterar a roda para "Sport"

#### Critérios de Aceitação
- Rodas "Sport" devem custar exatamente +R$ 2.000.
- Trocar apenas a cor do exterior/interior não altera o preço base

---

### CT03 - Configuração do Veículo (Adição de Opcionais) e cálculo de Preço

#### Objetivo
Validar se a seleção opcional ("Precision Park" e "Flux Capacitor") atualiza dinamicamente o preço do veículo.

#### Pré-Condições
- O usuário deve estar na página do Configurador de Veículo.
- Veículo sem opcionais selecionados (Preço R$: 40.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Marcar o checkbox opcional "Precision Park"  | O preço de venda deve ser acrescido de R$ 5.500,00 (Total temporário R$ 45.500,00). |
| 2  | Marcar o checkbox opcional "Flux Capacitor"  | O preço de venda deve ser acrescido de R$ 5.000,00 (Total temporário R$ 50.500,00). |
| 3  | Desmarcar o checkblox opcional "Precision Park" | O preço de total deve subtrair o valor de R$ 5.500,00 (total temporário R$ 45.000,00). |
| 4  | Desmarcar o checkblox opcional "Flux Capacitor" | O preço de total deve subtrair o valor de R$ 5.000,00 e voltar a R$ 40.000,00 |
| 5  | Clicar no botão "Monte o Seu" (Checkout)     | O usuário é redirecionado para a página de checkout (`/order`) com os valores persistidos.    |


#### Resultados Esperados
- O preço total acompanha de forma exata a marcação e desmacação dos opcionais.
- O redirecionamento leva a configuração e o preço corretos para o checkout.

#### Critérios de Aceitação
- As rodas "Sport" adicionam R$ 2.000.
- "Precision Park" adiciona R$ 5.500.
- "Flux Capacitor" adiciona R$ 5.000.
- O cálculo no `calculateTotalPrice` é refeito de forma isolada e atualiza a interface.

---

### CT04 - Checkout - Validação de Campos Obrigatórios

#### Objetivo
Garantir que o sistema impeça o avanço do checkout caso os campos obrigatórios não sejam preenchidos.

#### Pré-Condições
- O usuário deve ter concluído a configuração do veículo e clicado em "Avançar para Checkout".

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar todos os campos do formulário de dados pessoais em branco. | - |
| 2  | Clicar no botão "Finalizar Pedido" ou "Próximo". | O sistema exibe mensagens de erro indicando quais campos são obrigatórios. |
| 3  | Preencher apenas o campo "Nome" e clicar em "Próximo". | O sistema remove o erro do campo "Nome", mas mantém os erros dos demais campos vazios. |

#### Resultados Esperados
- O sistema bloqueia a submissão do formulário de checkout e destaca visualmente os campos obrigatórios não preenchidos.

#### Critérios de Aceitação
- Mensagens de erro claras devem ser exibidas para cada campo obrigatório não preenchido (ex: CPF, Email, Telefone, etc).
- O envio do formulário deve ser bloqueado.

---

### CT05 - Checkout - Simulação de Financiamento

#### Objetivo
Validar a regra de negócio de juros compostos de 2% ao mês em financiamentos travados em 12 parcelas.

#### Pré-Condições
- O usuário deve estar na etapa de pagamento do Checkout.
- Valor total do veículo configurado (ex: R$ 40.000).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir o valor de entrada de R$ 0,00. | O saldo a financiar é R$ 40.000. |
| 2  | Selecionar a opção de pagamento parcelado (financiamento). | O sistema exibe o plano de pagamento em 12x. |
| 3  | Verificar o valor da parcela calculado pelo sistema. | O valor da parcela deve refletir o cálculo de juros compostos de 2% ao mês sobre o saldo devedor por 12 meses (utilizando tabela Price ou equivalente da regra do sistema). |

#### Resultados Esperados
- O sistema deve calcular corretamente o valor das 12 parcelas aplicando a taxa de 2% ao mês sobre o valor financiado.

#### Critérios de Aceitação
- O financiamento deve ser fixado em 12 vezes.
- A taxa de juros utilizada deve ser de exatamente 2% (compostos) ao mês.

---

### CT06 - Análise de Crédito - Aprovação Automática por Entrada >= 50%

#### Objetivo
Validar que pedidos com entrada igual ou superior a 50% do valor total são aprovados automaticamente, ignorando o Score de crédito.

#### Pré-Condições
- O usuário deve estar na etapa de pagamento do Checkout.
- Veículo configurado no valor de R$ 40.000.
- Uma API mock de crédito ou perfil de teste que retorne um Score baixo (ex: Score 300).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir o valor de entrada de R$ 20.000 (50% do valor total). | O sistema aceita o valor de entrada. |
| 2  | Preencher os demais dados e clicar em "Finalizar Pedido". | O sistema submete o pedido. |
| 3  | Aguardar o processamento. | O sistema exibe a tela de Confirmação com status "Aprovado", mesmo com Score baixo. |

#### Resultados Esperados
- A regra de exceção é aplicada e o crédito é aprovado independentemente do Score do cliente.

#### Critérios de Aceitação
- Entradas >= 50% devem pular ou aprovar direto a análise de Score de crédito.

---

### CT07 - Análise de Crédito - Score > 700 (Aprovado)

#### Objetivo
Validar a aprovação de crédito para clientes com Score maior que 700.

#### Pré-Condições
- O usuário deve estar na etapa de pagamento do Checkout.
- Valor de entrada menor que 50% do total.
- O CPF/Dados do usuário de teste devem estar vinculados a um Score > 700 (ex: 750).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher os dados de pagamento. | - |
| 2  | Clicar em "Finalizar Pedido". | O sistema submete os dados para a API de crédito. |
| 3  | Aguardar a resposta da API. | O sistema exibe a tela de Confirmação com o status "Aprovado" e exibe o número do pedido. |

#### Resultados Esperados
- O pedido é processado e aprovado com base no alto Score de crédito.

#### Critérios de Aceitação
- Clientes com Score > 700 devem ter seus pedidos aprovados automaticamente.

---

### CT08 - Análise de Crédito - Score 501 a 700 (Em análise)

#### Objetivo
Validar o fluxo para clientes com Score mediano, que requer análise manual.

#### Pré-Condições
- O usuário deve estar na etapa de pagamento do Checkout.
- Valor de entrada menor que 50% do total.
- O CPF/Dados do usuário de teste devem estar vinculados a um Score entre 501 e 700 (ex: 600).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar em "Finalizar Pedido". | O sistema submete os dados para a API de crédito. |
| 2  | Aguardar a resposta da API. | O sistema exibe a tela de Confirmação com o status "Em análise" e informa que a equipe entrará em contato. Exibe o número do pedido. |

#### Resultados Esperados
- O pedido é registrado, mas fica com status pendente ("Em análise").

#### Critérios de Aceitação
- Clientes com Score entre 501 e 700 não são nem aprovados nem reprovados imediatamente.

---

### CT09 - Análise de Crédito - Score <= 500 (Reprovado)

#### Objetivo
Validar a recusa automática de crédito para clientes com Score baixo.

#### Pré-Condições
- O usuário deve estar na etapa de pagamento do Checkout.
- Valor de entrada menor que 50% do total.
- O CPF/Dados do usuário de teste devem estar vinculados a um Score <= 500 (ex: 450).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar em "Finalizar Pedido". | O sistema submete os dados para a API de crédito. |
| 2  | Aguardar a resposta da API. | O sistema exibe uma tela ou modal informando que o crédito foi "Reprovado" e sugere aumentar o valor da entrada ou tentar outra forma de pagamento. |

#### Resultados Esperados
- O pedido é negado devido ao risco de crédito.

#### Critérios de Aceitação
- Clientes com Score <= 500 devem ser reprovados se a entrada for menor que 50%.

---

### CT10 - Consulta de Pedidos - Sucesso

#### Objetivo
Validar a funcionalidade de busca e visualização do status de um pedido existente usando seu número.

#### Pré-Condições
- O usuário deve ter o número de um pedido previamente criado (ex: "PED-12345").
- O usuário deve estar na página "Consulta de Pedidos".

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir o número do pedido ("PED-12345") no campo de busca. | O campo recebe a entrada corretamente. |
| 2  | Clicar no botão "Consultar". | O sistema realiza a busca e exibe os detalhes do pedido (status, veículo, opcionais, valor total). |

#### Resultados Esperados
- O sistema retorna os dados corretos correspondentes ao número de pedido fornecido.

#### Critérios de Aceitação
- A consulta só deve retornar dados se o número exato do pedido for fornecido (segurança de dados).

---

### CT11 - Consulta de Pedidos - Número Inexistente

#### Objetivo
Garantir que o sistema lide graciosamente quando um usuário tenta consultar um número de pedido que não existe.

#### Pré-Condições
- O usuário deve estar na página "Consulta de Pedidos".

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir um número de pedido inválido (ex: "PED-00000"). | - |
| 2  | Clicar em "Consultar". | O sistema exibe uma mensagem amigável indicando "Pedido não encontrado". |

#### Resultados Esperados
- O sistema não quebra e fornece feedback claro ao usuário de que o pedido não foi localizado.

#### Critérios de Aceitação
- Exibição de mensagem de erro amigável para pedido não encontrado.

---

### CT12 - Consulta de Pedidos - Campo Vazio

#### Objetivo
Validar que não é possível realizar uma consulta sem informar o número do pedido.

#### Pré-Condições
- O usuário deve estar na página "Consulta de Pedidos".

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar o campo de número do pedido vazio. | - |
| 2  | Clicar em "Consultar". | O sistema impede a busca e exibe um aviso de que o campo é obrigatório. |

#### Resultados Esperados
- Nenhuma requisição desnecessária é feita à API e o usuário é instruído a preencher o campo.

#### Critérios de Aceitação
- O campo `order_number` deve ser tratado como obrigatório na tela de consulta.
