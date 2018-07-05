class Command {
  constructor(name) {
    this.name = name;
    this.aliases = [];
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

    this.action = fn;
    return this;
  }

  alias(a) {
    if (!a || a.length === 0 || a === '') return this;

    if (Array.isArray(a)) {
      a.forEach((el) => {
        this.aliases.push(el);
      });
    } else {
      this.aliases.push(a);
    }

    return this;
  }
}

class Flag {
  constructor(name) {
    this.name = name;
    this.aliases = [];
  }

  action(fn) {
    if (!fn) return this;

    this.action = fn;
    return this;
  }

  alias(a) {
    if (!a || a.length === 0 || a === '') return this;

    if (Array.isArray(a)) {
      a.forEach((el) => {
        this.aliases.push(el);
      });
    } else {
      this.aliases.push(a);
    }

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
    this.flags = [];
    this.commands = [];
  }

  flag(name) {
    if (!name || name === '') {
      throw new Error('Cannot create empty flag');
    }

    this.flags.forEach((f) => {
      if (f.name === name) {
        throw new Error(`A flag named ${name} already exists.`);
      }
    });

    const x = new Flag(name);
    this.flags.push(x);
    return x;
  }

  command(name) {
    if (!name || name === '') {
      throw new Error('Cannot create empty command');
    }

    this.commands.forEach((c) => {
      if (c.name === name) {
        throw new Error(`A command named ${name} already exists`);
      }
    });

    const x = new Command(name);
    this.commands.push(x);
    return x;
  }

  getVersion() {
    return this.v;
  }

  version(v) {
    this.v = v;
    return this;
  }

  parse() {
    const args = process.argv.splice(2);
    this.args = args;

    // Parse commands
    this.commands.forEach((c) => {
      if (c.default) c.action();
      if (args.includes(c.name)) {
        c.action();
      } else {
        c.aliases.forEach((a) => {
          if (args.includes(a)) c.action();
        });
      }
    });

    // Parse flags
    this.flags.forEach((f) => {
      if (args.includes(f.name)) {
        if (f.action) f.action();
        this[f.name.replace('-', '')] = true;
      } else {
        f.aliases.forEach((a) => {
          if (args.includes(a)) {
            if (f.action) f.action();
            this[f.name.replace('-', '')] = true;
          }
        });
      }
    });

    return this;
  }
}

module.exports = new Co();
