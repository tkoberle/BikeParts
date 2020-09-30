# BikeParts
Bike parts API written in node.js


# K8s Notes
   * When you expose a replicaiton controller (rc) via kubectl expose --type NodePort, the node IP to use for accessing the app can be found usin "minikuke ip" or bu running "kubectl get nodes -o yaml"and looking for the address field