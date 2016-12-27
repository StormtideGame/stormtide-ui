// I'm not sure if there are better typings available for Mocha globals
// I got these mostly from https://github.com/facebook/flow/issues/179

type Spec = () => ?any;

declare class describe {
	static (description: string, spec: Spec): void;
	static only(description: string, spec: Spec): void;
	static skip(description: string, spec: Spec): void;
	static timeout(ms: number): void;
}

declare class it {
	static (description: string, spec: Spec): void;
	static only(description: string, spec: Spec): void;
	static skip(description: string, spec: Spec): void;
}