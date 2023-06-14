const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 8)) e.preventDefault();
	if (!isEmail('email', 7)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value;
	if (txt.length < len) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerHTML = `텍스트를 ${len} 글자이상 입력해 주세요`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

function isPwd(pwd1, pwd2, len) {
	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	if (pwd1_val !== pwd2_val || pwd1_val.length < len || !num.test(pwd1_val) || !eng.test(pwd1_val) || !spc.test(pwd1_val)) {
		resetErr(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.innerHTML = `비밀번호는 ${len}글자 이상 특수문자, 영문, 숫자를 모두 포함하세요.`;
		pwdEl1.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(pwdEl1);
		return true;
	}
}

function isEmail(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const email = form.querySelector(`[name=${name}]`).value;

	if (/@/.test(email)) {
		const [forwordTxt, backwordTxt] = email.split('@');
		if (!forwordTxt || !backwordTxt) {
			resetErr(input);
			const errMsg = document.createElement('p');
			errMsg.innerHTML = `@앞쪽이나 뒤쪽에 문자값이 없습니다`;
			input.closest('td').append(errMsg);
			return false;
		} else {
			if (!/\./.test(backwordTxt)) {
				resetErr(input);
				const errMsg = document.createElement('p');
				errMsg.innerHTML = `@뒤쪽에 서비스명이 올바른지 확인하세요`;
				input.closest('td').append(errMsg);
				return false;
			} else {
				resetErr(input);
				return true;
			}
		}
	} else {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `이메일주소에 @를 포함시키세요`;
		input.closest('td').append(errMsg);
		return false;
	}
}

function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;
	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		resetErr(inputs);
		const errMsg = document.createElement('p');
		errMsg.innerText = `항목을 하나이상 선택하세요`;
		inputs[0].closest('td').append(errMsg);
		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;
	if (value === '') {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소중에 하나를 선택해주세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelectorAll('p');
	if (errMsg.length > 0) el.closest('td').querySelector('p').remove();
}
