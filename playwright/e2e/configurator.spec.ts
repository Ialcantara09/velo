import { test } from '../support/fixtures'


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

  test('deve atualizar o preço ao marcar/desmarcar opcionais e persistir no checkout', async ({ app }) => {
    await app.configurator.expectPrice('R$ 40.000,00')

    await app.configurator.setOptional('Precision Park', true)
    await app.configurator.expectPrice('R$ 45.500,00')

    await app.configurator.setOptional('Flux Capacitor', true)
    await app.configurator.expectPrice('R$ 50.500,00')

    await app.configurator.setOptional('Precision Park', false)
    await app.configurator.expectOptional('Precision Park', false)
    await app.configurator.expectOptional('Flux Capacitor', true)
    await app.configurator.expectPrice('R$ 45.000,00')

    await app.configurator.setOptional('Flux Capacitor', false)
    await app.configurator.expectOptional('Flux Capacitor', false)
    await app.configurator.expectPrice('R$ 40.000,00')

    await app.configurator.proceedToCheckout()
    await app.configurator.expectCheckoutPrice('R$ 40.000,00')
  })

})
