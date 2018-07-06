const find = (object, name) => {
  let found = null;
  Object.entries(object).forEach(([key, value]) => {
    const arr = key.split(' ');
    if (arr.includes(name)) found = value;
  });
  return found;
};

const log = msg => console.log(`\n  ${msg}\n`);
const error = (msg) => { console.log(`\n  Error: ${msg}\n`); process.exit(1); };

class Command {
  constructor(name) {
    this.name = name;
    this.func = false;
  }

  setDefault() {
    this.default = true;
    return this;
  }

  description(d) {
    if (!d || d === '') return this;

    this.description = d;
    return this;
  }

  action(fn) {
    if (!fn) return this;

    this.func = fn;
    return this;
  }

  strict(v) {
    this.strict = v;
    return this;
  }
}

class Flag {
  constructor(name) {
    this.name = name;
    this.func = false;
  }

  action(fn) {
    if (!fn) return this;

    this.func = fn;
    return this;
  }

  description(d) {
    if (!d || d === '') return this;

    this.description = d;
    return this;
  }
}

class Co {
  constructor() {
    this.v = '0.0.1';
    this.flags = {};
    this.commands = {};
  }

  flag(name, alias) {
    if (!name || name === '') {
      error('Cannot create empty flag');
    }

    if (find(this.flags, name)) {
      error(`A flag named ${name} already exists`);
    }

    const x = new Flag(name);

    if (!alias) {
      this.flags[name] = x;
    } else if (Array.isArray(alias) && alias.length !== 0) {
      let str = name;
      alias.forEach((a) => { str += ` ${a}`; });
      this.flags[str] = x;
    } else {
      this.flags[`${name} ${alias}`] = x;
    }

    return x;
  }

  command(name, alias) {
    if (!name || name === '') {
      error('Cannot create empty command');
    }

    if (find(this.commands, name)) {
      error(`A command named ${name} already exists`);
    }

    const x = new Command(name);

    if (!alias) {
      this.commands[name] = x;
    } else if (Array.isArray(alias) && alias.length !== 0) {
      let str = name;
      alias.forEach((a) => { str += ` ${a}`; });
      this.commands[str] = x;
    } else {
      this.commands[`${name} ${alias}`] = x;
    }

    return x;
  }

  displayVersion() {
    log(this.v);
  }

  version(v) {
    this.v = v;
    return this;
  }

  parse() {
    const args = process.argv.splice(2);
    this.args = args;
    let i;
    let j;

    // No flags or command passed, do default
    if (args.length === 0) {
      Object.values(this.commands).forEach((c) => {
        if (c.default) c.func();
      });
    }

    // Loop through passed arguments
    for (i = 0; i < args.length; i += 1) {
      const arg = args[i];

      // Check if is an existing flag or command
      let opt = find(this.flags, arg);
      if (!opt) {
        opt = find(this.commands, arg);
        if (!opt) {
          error(`${arg} is not a valid flag or command.`);
        }
      }

      // Call the associated action with correct number of arguments
      // TODO: allow for varying arguments
      if (opt.func) {
        const numArgs = opt.func.length;
        const r = [];
        for (j = 1; j <= numArgs; j += 1) {
          if (!args[i + j] || args[i + j] === '') {
            error(`${opt.name}: invalid number of arguments.`);
          }
          r.push(args[i + j]);
        }
        opt.func(...r);
        i = j;
      }
    }

    return this;
  }
}

module.exports = new Co();
