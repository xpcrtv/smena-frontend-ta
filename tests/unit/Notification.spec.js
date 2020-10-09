import { mount, createLocalVue } from '@vue/test-utils';
import Notification from '@/components/Notification.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('Notification.vue', () => {
  let localVue;
  let vuetify;
  let store;
  let mutations;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    vuetify = new Vuetify();
    mutations = {
      clearError: jest.fn()
    };
    store = new Vuex.Store({
      mutations
    });
  });

  const mountWithComputedProperty = (computed = {}) => {
    const component = mount(Notification, {
      localVue,
      vuetify,
      store,
      computed
    });
    return component;
  };

  it('not visible when error empty', () => {
    const errorVaule = () => null;
    const wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').exists()).toBe(
      false
    );
  });

  it('show on get error message', () => {
    const errorVaule = () => 'error message';
    const wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').exists()).toBe(
      true
    );
  });

  it('error message is correct', () => {
    const errorVaule = () => 'some error message';
    const wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').text()).toBe(
      errorVaule()
    );
  });

  // it('commit vuex mutation after updated', done => {
  //   const errorVaule = () => 'some error message';
  //   const wrapper = mountWithComputedProperty({ error: errorVaule });
  //   wrapper.vm.clearError();
  //   setTimeout(() => {
  //     expect(mutations.clearError).toHaveBeenCalled();
  //     done();
  //   }, 3001);
  // });
});
