import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Navbar from '../../../src/components/Navbar'

describe('Navbar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  it('renders', () => {
    const store = new Vuex.Store({
      state: {
        gameState: {},
        gameSettings: {}
      }
    })
    const wrapper = mount(Navbar, {
      localVue,
      store
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('shows "WIN"', () => {
    const store = new Vuex.Store({
      state: {
        gameState: {
          win: true
        },
        gameSettings: {}
      }
    })
    const wrapper = mount(Navbar, {
      localVue,
      store
    })

    expect(wrapper.text()).toContain('WIN')
    expect(wrapper.text()).not.toContain('LOSS')
  })

  it('shows "LOSS"', () => {
    const store = new Vuex.Store({
      state: {
        gameState: {
          loss: true
        },
        gameSettings: {}
      }
    })
    const wrapper = mount(Navbar, {
      localVue,
      store
    })

    expect(wrapper.text()).toContain('LOSS')
    expect(wrapper.text()).not.toContain('WIN')
  })

  it('rewrites user input when entered too many mines', async () => {
    const store = new Vuex.Store({
      state: {
        gameState: {},
        gameSettings: {
          rows: 10,
          columns: 10,
          mines: 10
        }
      }
    })
    const wrapper = mount(Navbar, {
      localVue,
      store
    })
    expect(wrapper.vm.maxMines).toBe(25)

    const minesInput = wrapper.find('#minesInput')
    minesInput.element.value = '36'
    await minesInput.trigger('input')
    await minesInput.trigger('blur')

    // rewrite state with correct value
    expect(store.state.gameSettings.mines).toBe(25)
  })
})
