import { mount, createLocalVue } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('LoginForm.vue', () => {
  let wrapper;
  let nameInput;
  let pwdInput;
  let submitBtn;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const vuetify = new Vuetify();

  const actions = {
    logIn: jest.fn(),
    setError: jest.fn()
  };

  const mutations = {
    setError: jest.fn()
  };

  const store = new Vuex.Store({
    actions,
    mutations
  });

  const $router = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router
      }
    });
    nameInput = wrapper.find('input[name="name"]');
    pwdInput = wrapper.find('input[name="password"]');
    submitBtn = wrapper.find('[data-testid="submit-btn"]');
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('form button disabled when some input empty', async () => {
    const submitBtn = wrapper.find('[data-testid="submit-btn"]');
    await wrapper.vm.$nextTick();
    expect(submitBtn.props().disabled).toBe(true);
  });

  it('form valid when entered username and password', async () => {
    await nameInput.setValue('test-user');
    await pwdInput.setValue('test-pwd');
    await wrapper.vm.$nextTick();
    expect(submitBtn.props().disabled).toBe(false);
    expect(wrapper.vm.username).toEqual('test-user');
    expect(wrapper.vm.password).toEqual('test-pwd');
    expect(wrapper.vm.isFormValid).toBe(true);
  });

  it('submit form dispatch correct action and call redirect', async () => {
    await nameInput.setValue('test-user1');
    await pwdInput.setValue('test-pwd1');
    await wrapper.find('form').trigger('submit');
    await expect(actions.logIn).toHaveBeenCalledWith(expect.any(Object), {
      username: 'test-user1',
      password: 'test-pwd1'
    });
    await expect($router.push).toHaveBeenCalledWith('/');
  });
});
