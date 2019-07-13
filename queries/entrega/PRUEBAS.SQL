select * from fase_carg;




select * from cliente

SELECT cliente_id, COUNT(credito_id),COUNT(debito_id),COUNT(transferencia_id),COUNT(cheque_id)
FROM PEDIDO, PEDI_TIPO
WHERE pedido_id = p_id_pedido
GROUP BY cliente_id

SELECT * FROM PEDIDO
SELECT * FROM pedi_prod

