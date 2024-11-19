//PEDIDOS

let order = {};
        let total = 0;
        let currentDrink = '';
        let currentPrice = 0;

        document.addEventListener('DOMContentLoaded', function() {
        const customerName = localStorage.getItem('customerName');
        if (customerName) {
            document.getElementById('displayCustomerName').textContent = customerName;
        }
    });

        function addToOrder(item, price) {
            if (item === 'Milkshake' || item === 'Té') {
                currentDrink = item;
                currentPrice = price;
                const modalId = item === 'Milkshake' ? 'milkshakeModal' : 'teaModal';
                document.getElementById(modalId).style.display = 'block';
            } else {
                if (order[item]) {
                    order[item].quantity++;
                } else {
                    order[item] = {
                        price: price,
                        quantity: 1
                    };
                }
                updateOrderDisplay();
            }
        }

        function selectFlavor(drink, flavor) {
            const itemName = `${drink} - ${flavor}`;
            if (order[itemName]) {
                order[itemName].quantity++;
            } else {
                order[itemName] = {
                    price: currentPrice,
                    quantity: 1
                };
            }
            document.getElementById('milkshakeModal').style.display = 'none';
            document.getElementById('teaModal').style.display = 'none';
            updateOrderDisplay();
        }

        function removeItem(item) {
            delete order[item];
            updateOrderDisplay();
        }

        function updateOrderDisplay() {
            const orderList = document.getElementById('orderList');
            orderList.innerHTML = '';
            total = 0;

            for (const [item, details] of Object.entries(order)) {
                const itemTotal = details.price * details.quantity;
                total += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'order-item';
                
                const itemText = document.createElement('span');
                itemText.textContent = `${item} x${details.quantity} - $${itemTotal}`;
                
                const deleteButton = document.createElement('span');
                deleteButton.className = 'delete-item';
                deleteButton.textContent = '×';
                deleteButton.onclick = () => removeItem(item);
                
                itemElement.appendChild(itemText);
                itemElement.appendChild(deleteButton);
                orderList.appendChild(itemElement);
            }

            document.getElementById('totalAmount').textContent = total;
        }

        window.onclick = function(event) {
            const milkshakeModal = document.getElementById('milkshakeModal');
            const teaModal = document.getElementById('teaModal');
            if (event.target === milkshakeModal) {
                milkshakeModal.style.display = 'none';
            }
            if (event.target === teaModal) {
                teaModal.style.display = 'none';
            }
        }

        function cancelOrder() {
            order = {};
            total = 0;
            updateOrderDisplay();
        }

        function confirmOrder() {
            if (total > 0) {
                alert('¡Pedido confirmado! Total: $' + total);
                cancelOrder();
            } else {
                alert('Por favor, agregue items a su pedido');
            }
        }
        