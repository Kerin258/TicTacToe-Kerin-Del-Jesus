import { useState, useEffect, useRef } from 'react';
import perroImg from './assets/perro.png';
import gatoImg from './assets/gato.png';

function calculateWinner(squares, boardSize = 3) {
	const N = boardSize;
	for (let r = 0; r < N; r++) {
		const start = r * N;
		const first = squares[start];
		if (!first) continue;
		let ok = true;
		for (let c = 0; c < N; c++) if (squares[start + c] !== first) ok = false;
		if (ok) return { winner: first, winnerRow: Array.from({ length: N }, (_, i) => start + i) };
	}


	for (let c = 0; c < N; c++) {
		const first = squares[c];
		if (!first) continue;
		let ok = true;
		for (let r = 0; r < N; r++) if (squares[c + r * N] !== first) ok = false;
		if (ok) return { winner: first, winnerRow: Array.from({ length: N }, (_, i) => c + i * N) };
	}


	const main = squares[0];
	if (main) {
		let ok = true;
		for (let k = 0; k < N; k++) if (squares[k * (N + 1)] !== main) ok = false;
		if (ok) return { winner: main, winnerRow: Array.from({ length: N }, (_, i) => i * (N + 1)) };
	}


	const anti = squares[N - 1];
	if (anti) {
		let ok = true;
		for (let k = 0; k < N; k++) if (squares[(k + 1) * (N - 1)] !== anti) ok = false;
		if (ok) return { winner: anti, winnerRow: Array.from({ length: N }, (_, i) => (i + 1) * (N - 1)) };
	}

	return { winner: null, winnerRow: null };
}


function Square({ value, onClick, highlight, iconSet }) {
	const imgSrc = value === 'X' ? perroImg : gatoImg;

	return (
		<button className={`square ${highlight ? 'square--green' : ''}`} onClick={onClick}>
			{iconSet === 'imagen' && value ? (
				<img src={imgSrc} alt={value} style={{ width: 40, height: 40 }} />
			) : (
				value
			)}
		</button>
	);
}

function Board({ squares, boardSize, winnerSquares, onClick, iconSet }) {
	const renderSquare = i => {
		const highlight = Array.isArray(winnerSquares) && winnerSquares.includes(i);
		return <Square key={i} value={squares[i]} highlight={highlight} onClick={() => onClick(i)} iconSet={iconSet} />;
	};

	const rows = [];
	let cell = 0;
	for (let r = 0; r < boardSize; r++) {
		const cols = [];
		for (let c = 0; c < boardSize; c++) cols.push(renderSquare(cell++));
		rows.push(
			<div key={r} className="board-row">
				{cols}
			</div>
		);
	}

	return <div>{rows}</div>;
}

export default function App() {
	const [boardSize, setBoardSize] = useState(3);
	const total = boardSize * boardSize;

	const [history, setHistory] = useState([{ squares: Array(total).fill(null) }]);
	const [step, setStep] = useState(0);

	const [iconSet, setIconSet] = useState('text');
	const [started, setStarted] = useState(false);
	const xIsNext = step % 2 === 0;


	useEffect(() => {
		const newTotal = boardSize * boardSize;
		setHistory([{ squares: Array(newTotal).fill(null) }]);
		setStep(0);
	}, [boardSize]);

	const current = history[step] || history[history.length - 1];
	const { winner, winnerRow } = calculateWinner(current.squares, boardSize);

	function handleClick(i) {
		if (!started) return;
		const newHistory = history.slice(0, step + 1);
		const currentSquares = [...newHistory[newHistory.length - 1].squares];
		if (winner || currentSquares[i]) return;
		currentSquares[i] = xIsNext ? 'X' : 'O';
		setHistory([...newHistory, { squares: currentSquares }]);
		setStep(newHistory.length);
	}

	function jumpTo(move) {
		setStep(move);
	}

	function changeBoardSize(size) {
		if (size === boardSize) return;
		setBoardSize(size);
		const newTotal = size * size;
		setHistory([{ squares: Array(newTotal).fill(null) }]);
		setStep(0);
	}

	function startGame() {
		setStarted(true);
	}

	function resetGame() {
		const newTotal = boardSize * boardSize;
		setHistory([{ squares: Array(newTotal).fill(null) }]);
		setStep(0);
		setStarted(false);
	}

	function newGame() {
		setHistory([{ squares: Array(total).fill(null) }]);
		setStep(0);
	}

	function changeIconSet(set) {
		setIconSet(set);
	}

	let moves = history.map((stepData, move) => (
		<li key={move}>
			<button className="button button--green" onClick={() => jumpTo(move)}>
				{move === 0 ? 'Ir al inicio' : `Ir al movimiento #${move}`}
			</button>
		</li>
	));




	const nextPlayer = xIsNext ? 'X' : 'O';
	function PlayerImage({ player }) {
		const src = player === 'X' ? perroImg : gatoImg;
		return <img className="status-img" src={src} alt={player} />;
	}

	const status = winner ? (
		<>
			<span>Ganador:</span>
			{iconSet === 'imagen' ? (
				<PlayerImage player={winner} />
			) : (
				<span style={{ marginLeft: 8, fontWeight: 'bold' }}>{winner}</span>
			)}
		</>
	) : (
		<>
			<span>Siguiente jugador:</span>
			{iconSet === 'imagen' ? (
				<PlayerImage player={nextPlayer} />
			) : (
				<span style={{ marginLeft: 8, fontWeight: 'bold' }}>{nextPlayer}</span>
			)}
		</>
	);


	const [showEaster, setShowEaster] = useState(false);
	const clickCount = useRef(0);
	const clickTimer = useRef(null);

	function handleTitleClick() {
		clickCount.current += 1;
		if (clickTimer.current) clearTimeout(clickTimer.current);
		clickTimer.current = setTimeout(() => {
			clickCount.current = 0;
			clickTimer.current = null;
		}, 700);

		if (clickCount.current >= 3) {
			clickCount.current = 0;
			if (clickTimer.current) {
				clearTimeout(clickTimer.current);
				clickTimer.current = null;
			}
			setShowEaster(true);
		}
	}

	useEffect(() => {
		function onKey(e) {
			if (e.key === 'Escape') setShowEaster(false);
		}
		if (showEaster) window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [showEaster]);

	return (
		<div className="app-container">
			<header className="game-header">
				<div className="game-header-title" onClick={handleTitleClick}>TicTacToe</div>
			</header>

			<div className="game-content">
				<div className="game-left-section">
					<div className="game-left-panel">
						<div className="status">{status}</div>

						<div className="board-section">
							<div className="panel-title">TAMAÑO DEL TABLERO</div>
							<div className="board-size-buttons">
								<button className={`size-button ${boardSize === 3 ? 'active' : ''}`} onClick={() => changeBoardSize(3)}>3x3</button>
								<button className={`size-button ${boardSize === 4 ? 'active' : ''}`} onClick={() => changeBoardSize(4)}>4x4</button>
								<button className={`size-button ${boardSize === 5 ? 'active' : ''}`} onClick={() => changeBoardSize(5)}>5x5</button>
							</div>


							<div className="panel-title" style={{ marginTop: 12 }}>ICONOS</div>
							<div className="icon-control">
								<div className="icon-options">
									<button
										className={`size-button ${iconSet === 'text' ? 'active' : ''}`}
										onClick={() => changeIconSet('text')}
										aria-pressed={iconSet === 'text'}
									>
										Texto <span className="icon-sample">X / O</span>
									</button>
									<button
										className={`size-button ${iconSet === 'imagen' ? 'active' : ''}`}
										onClick={() => changeIconSet('imagen')}
										aria-pressed={iconSet === 'imagen'}
									>
										Imagen
									</button>
								</div>
							</div>

							<div className="start-row">
								<button className="button button--new-game small-button" onClick={resetGame}>Resetear</button>
								<button className="button button--new-game start-button" onClick={startGame}>Iniciar</button>
							</div>
						</div>
					</div>
				</div>

				<div className="game-center-section">
					<div className="board-container">
						<div className="board-container-title">Tablero {boardSize}x{boardSize}</div>
						<div className={`game-board ${started ? '' : 'board-disabled'}`}>
							<Board squares={current.squares} boardSize={boardSize} winnerSquares={winnerRow} onClick={handleClick} iconSet={iconSet} />
						</div>
						{!started && (
							<div className="board-overlay" aria-hidden>
								<div className="overlay-content">
									<span>Pulse</span>
									<button className="button small-button" onClick={startGame}>Iniciar</button>
									<span>para jugar</span>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="game-right-section">
					<div className="history-section">
						<div className="history-title">Historial</div>

						<div className="history-list">
							<ol>{moves}</ol>
						</div>
					</div>
				</div>
			</div>

				{showEaster && (
					<div className="modal-overlay" onClick={() => setShowEaster(false)}>
						<div className="easter-egg-modal" onClick={e => e.stopPropagation()}>
							<div className="easter-egg-title">Sorpresa</div>
							<div className="easter-egg-content">
								<div className="easter-egg-item">
									<div className="easter-egg-label">Nombre</div>
									<div className="easter-egg-value">Kerin Del Jesus Gonzalez Maas</div>
								</div>
								<div className="easter-egg-item">
									<div className="easter-egg-label">Matrícula</div>
									<div className="easter-egg-value">72962</div>
								</div>
								<button className="easter-egg-close" onClick={() => setShowEaster(false)}>Cerrar</button>
							</div>
						</div>
					</div>
				)}
		</div>
	);
}


