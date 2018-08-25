import compile from '../compile';

exports = module.exports = (program) => {
	let chars = [
        '   _    _  ____  ____  _  _ ',
        '( \/\/ )( ___)(  _ \( \/ )',
        ' )    (  )__)  )___/ \  / ',
        '(__/\__)(____)(__)   (__) ',
        '                                         '
    ].join('\n');
	console.log(chars);
	
	if (compile.init(program)) {
	    compile.build(program);
	}

}