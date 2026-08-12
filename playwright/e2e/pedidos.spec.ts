import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { type OrderDetails } from '../support/actions/orderLockupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    // Arrange - Landing
    await app.orderLockup.open()
   })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-T2VAZ8',
      status: 'APROVADO',
      color: 'Lunar White', 
      wheels: 'aero Wheels',
      customer: {
        name: 'Ivone Alcantara',
        email: 'ivone@velo.dev',
      },
      payment: 'À Vista',
    } satisfies OrderDetails

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-L0QXYI',
      status: 'REPROVADO',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'steve@apple.com',
      },
      payment: 'À Vista',
    } satisfies OrderDetails

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-9D4MAY',
      status: 'EM_ANALISE',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'Ana Claudia Silva',
        email: 'Ana@gmail.com',
      },
      payment: 'À Vista',
    } satisfies OrderDetails

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app, page }) => {
    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })
})
