import { mount, createLocalVue } from '@vue/test-utils';
import RegisterForm from '@/components/RegisterForm.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import flushPromises from '../utils/flushPromises';

describe('RegisterForm.vue', () => {
  let wrapper;
  let nameInput;
  let pwdInput;
  let pwdRepeatInput;
  let submitBtn;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const vuetify = new Vuetify();

  const actions = {
    logIn: jest.fn(),
    register: jest.fn().mockImplementation(() => Promise.resolve('2')),
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
    wrapper = mount(RegisterForm, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router
      }
    });
    nameInput = wrapper.find('input[name="name"]');
    pwdInput = wrapper.find('input[name="password"]');
    pwdRepeatInput = wrapper.find('input[name="password-repeat"]');
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
    await pwdRepeatInput.setValue('test-pwd');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.username).toEqual('test-user');
    expect(wrapper.vm.password).toEqual('test-pwd');
    expect(wrapper.vm.isFormValid).toBe(true);
    expect(submitBtn.props().disabled).toBe(false);
  });

  it('form invalid when entered wrong data', async () => {
    await nameInput.setValue('te');
    await pwdInput.setValue('test-pwd2');
    await pwdRepeatInput.setValue('test-pwd23');
    await wrapper.vm.$nextTick();
    expect(submitBtn.props().disabled).toBe(true);
    expect(wrapper.vm.isFormValid).toBe(false);
  });

  it('submit form dispatch correct actions', async () => {
    nameInput.setValue('test-user1');
    pwdInput.setValue('test-pwd1');
    pwdRepeatInput.setValue('test-pwd1');
    wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(actions.register).toHaveBeenCalledWith(expect.any(Object), {
      username: 'test-user1',
      password: 'test-pwd1'
    });
    expect(actions.logIn).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith('/');
  });
});
