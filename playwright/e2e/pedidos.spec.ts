import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

// Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-T2VAZ8')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

// Assert  
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000})
  //await expect(page.getByTestId('order-result-id')).toContainText(' ')
  await expect(page.getByText('VLO-T2VAZ8')).toBeVisible({timeout: 10_000})
  await expect(page.getByText('VLO-T2VAZ8')).toContainText(' ')  

  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByText('APROVADO')).toContainText(' ')

})

