import { test, expect } from '../support/fixtures'


test.describe('Configuração do Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
      await app.configurator.expectPrice('R$ 40.000,00')

      await app.configurator.selectColor('Midnight Black')
      await app.configurator.expectPrice('R$ 40.000,00')
      await app.configurator.expectCarImageSrc('/src/assets/midnight-black-aero-wheels.png')  
      
      await app.configurator.selectColor('Lunar White')
      await app.configurator.expectPrice('R$ 40.000,00')
      await app.configurator.expectCarImageSrc('/src/assets/lunar-white-aero-wheels.png') 
            
})

  test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ app }) => {
    await app.configurator.expectPrice('R$ 40.000,00')

    await app.configurator.selectWheels(/Sport Wheels/)
    await app.configurator.expectPrice('R$ 42.000,00')
    await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-sport-wheels.png')

    await app.configurator.selectWheels(/Aero Wheels/)
    await app.configurator.expectPrice('R$ 40.000,00')
    await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-aero-wheels.png')
  })

  
  test('deve atualizar o preço incrementalmente e ir ao checkout com estado base', async ({ page }) => {
      // Arrange
      await page.goto('/configure')
      const price = page.getByTestId('total-price')
      await expect(price).toHaveText('R$ 40.000,00')
      const precisionPark = page.getByRole('checkbox', { name: 'Precision Park' })
      const fluxCapacitor = page.getByRole('checkbox', { name: 'Flux Capacitor' }) 
      // Passo 1
      await precisionPark.check() 
      await expect(price).toHaveText('R$ 45.500,00')
      // Passo 2
      await fluxCapacitor.check()
      await expect(price).toHaveText('R$ 50.500,00')
      // Passo 3
      await precisionPark.uncheck()
      await expect(precisionPark).not.toBeChecked()
      await expect(fluxCapacitor).toBeChecked()
      await expect(price).toHaveText('R$ 45.000,00')
      // Passo 4
      await fluxCapacitor.uncheck()
      await expect(fluxCapacitor).not.toBeChecked()
      await expect(price).toHaveText('R$ 40.000,00')
      // Passo 5
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL(/\/order/)
      await expect(page.getByTestId('summary-total-price')).toHaveText('R$ 40.000,00')
  })

})
