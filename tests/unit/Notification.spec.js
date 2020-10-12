import { mount, createLocalVue } from '@vue/test-utils';
import Notification from '@/components/Notification.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('Notification.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const vuetify = new Vuetify();
  const mutations = {
    clearError: jest.fn()
  };
  const store = new Vuex.Store({
    mutations
  });

  let wrapper;

  afterEach(() => wrapper.destroy());

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
    wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').exists()).toBe(
      false
    );
  });

  it('show on get error message', () => {
    const errorVaule = () => 'error message';
    wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').exists()).toBe(
      true
    );
  });

  it('error message is correct', () => {
    const errorVaule = () => 'some error message';
    wrapper = mountWithComputedProperty({ error: errorVaule });
    expect(wrapper.find('[data-testid="app-notification"]').text()).toBe(
      errorVaule()
    );
  });

  it('commit vuex mutation after get error message', done => {
    const errorVaule = () => 'some error message';
    wrapper = mountWithComputedProperty({ error: errorVaule });
    wrapper.vm.clearError();
    setTimeout(() => {
      expect(mutations.clearError).toHaveBeenCalled();
      done();
    }, 3000);
  });
});
